import axios, { AxiosError, AxiosInstance } from 'axios';
import logger from '../common/utils/logger';
import { handleApplicationError } from '../components/common/ApplicationError';

const apiClient: AxiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// #region Private methods

const sucessResponseHandler = (response: any) => {
  // Add configurations here
  if (process.env.REACT_APP_API_LOG_REQUEST_RESPONSE === 'true') {
    logger.info(
      'Response Interceptor: ' +
        `method: ${response.config.method}, ` +
        `serviceURL: ${response.config.url}, ` +
        `statusCode: ${response.status}, ` +
        `data: ${JSON.stringify(response.data, null, 2)}`
    );
  }
  return response;
};

// #endregion

//Interceptors for requests
apiClient.interceptors.request.use(
  (req) => {
    // Add configurations here
    if (process.env.REACT_APP_API_LOG_REQUEST_RESPONSE === 'true') {
      logger.info(`Request Interceptor: ${JSON.stringify(req, null, 2)}`);
    }
    return req;
  },
  (error: AxiosError) => handleApplicationError(error) // Handle error
);

//Interceptors for response
apiClient.interceptors.response.use(
  (res) => sucessResponseHandler(res),
  (error: AxiosError) => handleApplicationError(error) // Handle error
);

export default apiClient;
