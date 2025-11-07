
import { Modal } from 'antd';
import  style from './modal.module.css'

const AboutModal = ({ isModalOpen, setIsModalOpen, message }) => {

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
 
    return (
        <>

            <Modal
                title="My Building Tax"
                closable={ 'Custom Close Button' }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p className={style.modal_message}>{message}</p>

            </Modal>
        </>
    );
};
export default AboutModal;