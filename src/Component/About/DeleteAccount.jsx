
import styles from '@/Pages/About/about.module.css'
import { deleteSelfAccount } from '@/Functions/FirebaseFunctions';
import Spinner from '../../Helpers/Spinner';
import { useSuccessModal } from '@/Hooks/ModalHook';



const DeleteAccount = (props) => {
    const { confirmModal, contextHolder, alertMessage, infoModal, successMessage } = useSuccessModal()

    const apartmentNumber = props.user?.user;
    const { setIsLoading, setUser, setLogin,
        navigate, isLoading, isEditing, user } = props;


    const handleDeleteSelfAccount = async () => {
        if (!apartmentNumber) {
            alert("Не е намерен номер на апартамент за изтриване.");
            return;
        }

        if (!await confirmModal(`Сигурни ли сте, че искате да изтриете акаунта си за ап. ${apartmentNumber}? Това е НЕОБРАТИМО!`)) {
            return;
        }


        setIsLoading(true);
        try {
            await deleteSelfAccount(apartmentNumber);
            setUser(null);
            alert("Вашият акаунт беше успешно изтрит. Излизате от системата.");
            setLogin(false);
            navigate('/');
        } catch (error) {
            setIsLoading(false);

            if (error.message.includes('requires-recent-login')) {
                alertMessage("⚠️ ЗАДЪЛЖИТЕЛНО: За да завършите изтриването, моля, **влезте отново** (logout/login) и опитайте отново веднага след това. Това е мярка за сигурност.");
            } else {
                alert(`Възникна грешка при изтриването: ${error.message}`);
            }
        }
    };

    return (
        <> {contextHolder}
            {user?.uid && !isEditing && (
                <button
                    className={styles.deleteSelfButton}
                    onClick={handleDeleteSelfAccount}
                    disabled={!apartmentNumber || isLoading}
                >
                    {isLoading ? <Spinner /> : `Изтрий моя акаунт (Ап. ${apartmentNumber || 'Н/А'})`}
                </button>
            )}
        </>
    )
}

export default DeleteAccount