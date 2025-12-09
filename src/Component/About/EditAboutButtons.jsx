import styles from '@/Pages/About/about.module.css'
import { updateData } from '@/Functions/FirebaseFunctions';

const EditAboutButtons = ({
    user, isLoading,
    isEditing, dataSettings,
    setIsEditing, setText, text
}) => {



    const addCorrection = async () => {
        if (isEditing) {
            try {
                const newData = { ...dataSettings, about: text };
                await updateData(newData);
                alert('Промените бяха запазени успешно!');
                setIsEditing(false);
            } catch (error) {
                alert(`Грешка при запазване: ${error.message}`);
            }
        } else {
            setIsEditing(true);
        }
    }

    const cancel = () => {
        dataSettings.about && setText(dataSettings.about);
        setIsEditing(false);
    }

    return (
        <>
            {user?.cashier && (
                <main className={styles.mainSection}>
                    <button
                        className={styles.corection}
                        onClick={addCorrection}
                        disabled={isLoading}
                    >
                        {isEditing ? '💾 Запази промените' : '✏️ Корекция'}
                    </button>
                    {isEditing &&
                        <button
                            className={styles.rejectButton}
                            onClick={cancel}
                            disabled={isLoading}
                        >❌ Откажи</button>
                    }
                </main>
            )}
        </>
    )
}

export default EditAboutButtons
