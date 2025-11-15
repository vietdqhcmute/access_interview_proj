import { PROCESS_STATUS } from "../constants/dashboard-constants";

  export const getStatusLabel = (status: string) => {
    const statusConfig = {
      [PROCESS_STATUS.PROCESSING]: 'Processing',
      [PROCESS_STATUS.SUCCESSFULL]: 'Successful',
      [PROCESS_STATUS.FAILED]: 'Failed',
    };

    return statusConfig[status as keyof typeof statusConfig];
  }
