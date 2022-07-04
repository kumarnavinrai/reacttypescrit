import { createContext, memo, useState } from 'react';
import { NotificationContainerProps, NotificationProviderProps } from './Notification.types';

export const NotificationValueContext = createContext({ messageModel: { message: '', severity: 'info' } });
export const NotificationSetContext = createContext({ setMessageModel: (message: string, severity?: string) => {} });

const NotificationProvider = memo((props: NotificationProviderProps) => {
  const handleMessageSet = (message: string, severity = 'info') => {
    props.setMessageModel({ message, severity });
  };

  return (
    <NotificationSetContext.Provider value={{ setMessageModel: handleMessageSet }}>
      {props.children}
    </NotificationSetContext.Provider>
  );
});

export const NotificationContainer = (props: NotificationContainerProps) => {
  const [messageModel, setMessageModel] = useState({ message: '', severity: 'info' });

  return (
    <NotificationValueContext.Provider value={{ messageModel }}>
      <NotificationProvider setMessageModel={setMessageModel}>{props.children}</NotificationProvider>
    </NotificationValueContext.Provider>
  );
};
