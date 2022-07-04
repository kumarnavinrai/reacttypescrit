import { useContext } from 'react';
import { NotificationSetContext, NotificationValueContext } from './Notification.context';


//Use for Setting notification model
const useSetNotification = () => useContext(NotificationSetContext);

//Use for reading the data from notification model
const useGetNotification = () => useContext(NotificationValueContext);

//Use for both SET and GET 
const useNotification = () => {
  const setMessageModel = useContext(NotificationSetContext);
  const messageModel = useContext(NotificationValueContext);

  return {
    setMessageModel,
    messageModel,
  };
};

export { useSetNotification, useGetNotification, useNotification };
