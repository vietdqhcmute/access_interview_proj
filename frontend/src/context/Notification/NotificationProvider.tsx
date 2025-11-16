import type { ReactNode } from 'react';
import { notification } from 'antd';
import NotificationContext from './NotificationContex';

interface NotificationProviderProps {
  children: ReactNode;
}
const PLACEMENT = 'bottomRight';
const DURATION = 1;

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const notifySuccess = (description: string) => {
    api.success({
      message: 'Successful!',
      description,
      placement: PLACEMENT,
      duration: DURATION,
    });
  };

  const notifyError = (description: string) => {
    api.error({
      message: 'Error!',
      description,
      placement: PLACEMENT,
      duration: DURATION,
    });
  };

  return (
    <NotificationContext.Provider value={{ api, notifySuccess, notifyError }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
