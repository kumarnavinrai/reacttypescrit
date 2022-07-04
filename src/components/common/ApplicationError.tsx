import axios, { AxiosError } from 'axios';
import logger from '../../common/utils/logger';

export type ApplicationSeverity = 'error' | 'warn' | 'info' | 'success';

/**
 * Extending the error interface to add application specific information
 */
export class ApplicationError extends Error {
  name = 'ApplicationError';
  //Error code to map to the list of errors mapping from Server to Client
  errorCode?: number;
  //Severity error, info, warning, success etc
  severity?: string;
  //Status Code (e.g 401, 404, 422, 500)
  statusCode: number | null;

  constructor(message: string, statusCode: number | null, severity: ApplicationSeverity = 'info', errorCode?: number) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.severity = severity;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

/**
 * Handle application errors
 */
export const handleApplicationError = (error: AxiosError) => {
  //Log the error message to console in debug mode.
  if (error.response)
    logger.debug(
      'Axios Error: ' +
        `method: ${error.response.config.method}, ` +
        `serviceURL: ${error.response.config.url}, ` +
        `statusCode: ${error.response.status}, ` +
        `errorMessage: ${error.message}, ` +
        `data: ${JSON.stringify(error.response.data, null, 2)}`
    );
  else logger.debug(error);

  const statusCode = error.response ? error.response.status : null;

  let errorMessage = {
    statusCode,
    errorMessage: 'Error has occurred while processing the request.', //Default Error message
    severity: 'error',
  };

  if (axios.isCancel(error)) {
    errorMessage.errorMessage = error.message ? error.message : 'Request cancelled or aborted';
    errorMessage.severity = 'warning';
  }

  if (statusCode) {
    const result = errorMessages.get(statusCode);
    if (result) errorMessage = result;

    //Set the error message from API if the statusCode is 422
    if (error.response && statusCode === 422) errorMessage.errorMessage = error.response.data.message;
  }

  return Promise.reject(
    new ApplicationError(
      errorMessage.errorMessage,
      errorMessage.statusCode,
      errorMessage.severity as ApplicationSeverity
    )
  );
};

/**
 * List of Error Messages
 */
let errorMessages = new Map<number, { statusCode: number; errorMessage: string; severity: string }>();

//Set the Error Message Dictionary
errorMessages.set(401, {
  statusCode: 401,
  errorMessage: 'Token invalid or expired. Please login to access this resource',
  severity: 'error',
});
errorMessages.set(404, {
  statusCode: 404,
  errorMessage: 'The requested resource does not exist or has been deleted',
  severity: 'error',
});
errorMessages.set(500, { statusCode: 500, errorMessage: 'Internal server error', severity: 'error' });
