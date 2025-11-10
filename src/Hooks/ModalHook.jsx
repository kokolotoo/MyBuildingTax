import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * Хук за показване на модален прозорец при успешен вход/регистрация
 */
export const useSuccessModal = () => {
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();

    const successLogin = (number) => {
        modal.success({
            title: 'My Building Tax',
            content: `Добре дошли, апартамент: ${number}`,
            onOk() {
                navigate('/');
            },
        });
    };


    const alertMessage = (message) => {
        modal.error({
            title: 'My Building Tax',
            content: message,
        });
    };


    const infoModal = (message) => {
        modal.info({
            title: 'My Building Tax',
            content: message,
        });
    }

    return { successLogin, contextHolder, alertMessage, infoModal };
};
