import styles from '@/Pages/About/about.module.css'
import Spinner from '@/Helpers/Spinner'
import { deleteOldFiles, deleteOldUrlsFromFirestore, deleteOldExpenses } from '@/Functions/DeleteOldData';
import { useSuccessModal } from '@/Hooks/ModalHook';


const DeleteData = ({ user, isEditing, isLoading, setIsLoading }) => {
    const { confirmModal, contextHolder, successMessage } = useSuccessModal()

    const handleDeleteOldData = async () => {
        if (!await confirmModal(`Сигурни ли сте, че искате да изтриете всички стари данни (от ${new Date().getFullYear() - 2} г. и по-рано)?`)) {
            return;
        }

        setIsLoading(true);
        try {
            await deleteOldFiles();
            await deleteOldUrlsFromFirestore();
            await deleteOldExpenses();
            successMessage('Изтриването на стари данни приключи успешно!');
        } catch (error) {
            alert(`Възникна грешка при изтриването: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
            {user?.cashier && !isEditing && (
                <button
                    className={styles.deleteOldButton}
                    onClick={handleDeleteOldData}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : `🗑️ Изтрии данни от ${new Date().getFullYear() - 2} г.`}
                </button>
            )}
        </>
    )
}

export default DeleteData
