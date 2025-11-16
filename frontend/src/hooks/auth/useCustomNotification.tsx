import { notification } from "antd";
const PLACEMENT = 'bottomRight';
const DURATION = 1;

const useCustomNotification = () => {
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

    return {
        contextHolder,
        notifySuccess,
        notifyError,
    };
};

export default useCustomNotification;
