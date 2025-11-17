import { createContext } from 'react';
import type { NotificationInstance } from 'antd/es/notification/interface';

interface NotificationContextType {
  api: NotificationInstance;
  notifySuccess: (description: string) => void;
  notifyError: (description: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export default NotificationContext;
