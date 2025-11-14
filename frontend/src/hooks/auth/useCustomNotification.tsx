import { notification } from "antd";

const useCustomNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const notifySuccess = (description: string) => {
        api.success({
            message: 'Successful!',
            description,
        });
    };

    const notifyError = (description: string) => {
        api.error({
            message: 'Error!',
            description,
        });
    };

    return {
        contextHolder,
        notifySuccess,
        notifyError,
    };
};

export default useCustomNotification;
