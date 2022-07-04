import { ReactChildren, ReactChild, Dispatch, SetStateAction } from 'react';

export interface NotificationProviderProps {
  setMessageModel: Dispatch<SetStateAction<{ message: string; severity: string }>>;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export interface NotificationContainerProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
