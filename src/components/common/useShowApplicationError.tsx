import { useCallback } from 'react';
import { useSetNotification } from '../notification/useNotification';
import { ApplicationError } from './ApplicationError';

/**
This component is used for Showing Application Error to the UI.
*/
export const useShowApplicationError = () => {
  const setMessage = useSetNotification();

  const showApplicationError = useCallback(
    (error: Error, defaultErrorMessage: string = 'An unknown error has occurred while processing the request.') => {
      if (error instanceof ApplicationError) {
        setMessage.setMessageModel(error.message, error.severity?.toString());
      } else {
        setMessage.setMessageModel(defaultErrorMessage, 'error');
      }
    },
    [setMessage]
  );

  return { showApplicationError };
};
