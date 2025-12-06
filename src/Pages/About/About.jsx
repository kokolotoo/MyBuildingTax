import { useState, useEffect } from 'react'
import styles from './about.module.css'
import { useAuthGuard } from "@/Hooks/useAuthGuard";
import { updateData, deleteSelfAccount, getTaxData } from '@/Functions/FirebaseFunctions';
import { deleteOldFiles, deleteOldUrlsFromFirestore, deleteOldExpenses } from '@/Functions/DeleteOldData';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Helpers/Spinner';


const About = () => {

    const [isEditing, setIsEditing] = useState(false); // Преименувах correction на isEditing
    const [isLoading, setIsLoading] = useState(false); // Нов state за индикация на зареждане (при изтриване)
    const navigate = useNavigate();
    const { dataSettings, user, setUser, setLogin } = useAuthGuard();
    const [text, setText] = useState(null);
    const apartmentNumber = user?.user; // Номерът на апартамента като стринг ("16")

    // 🎯 ОБЕДИНЕНА ЛОГИКА ЗА ЗАРЕЖДАНЕ НА ДАННИ
    useEffect(() => {
        const loadAboutData = async () => {
            // 1. Опит за зареждане от getTaxData (вероятно по-актуално/основно)
            try {
                const result = await getTaxData();
                if (result && result.about) {
                    setText(result.about);
                    return; // Ако има данни, приключваме
                }
            } catch (error) {
                console.error("Грешка при зареждане на TaxData:", error);
                // Продължаваме към dataSettings, ако getTaxData не успее
            }

            // 2. Fallback: Зареждане от dataSettings (ако е налично от useAuthGuard)
            if (dataSettings && dataSettings.about) {
                setText(dataSettings.about);
            }
        };

        loadAboutData();
    }, [dataSettings]); // Зависи от dataSettings, за да се опита зареждане, ако току-що са станали налични

    const addCorrection = async () => {
        if (isEditing) {
            // Запазване на промените
            try {
                const newData = { ...dataSettings, about: text };
                await updateData(newData);
                alert('Промените бяха запазени успешно!');
                setIsEditing(false);
            } catch (error) {
                alert(`Грешка при запазване: ${error.message}`);
            }
        } else {
            // Влизане в режим на редактиране
            setIsEditing(true);
        }
    }

    const cancel = () => {
        // Връщане към оригиналния текст, ако е наличен
        dataSettings.about && setText(dataSettings.about);
        setIsEditing(false);
    }

    const deleteOld = async () => {
        if (!window.confirm(`Сигурни ли сте, че искате да изтриете всички стари данни (от ${new Date().getFullYear() - 2} г. и по-рано)?`)) {
            return;
        }

        setIsLoading(true); // ⬅️ Започва зареждане
        try {
            await deleteOldFiles();
            await deleteOldUrlsFromFirestore();
            await deleteOldExpenses();
            alert('Изтриването на стари данни приключи успешно!');
        } catch (error) {
            alert(`Възникна грешка при изтриването: ${error.message}`);
        } finally {
            setIsLoading(false); // ⬅️ Приключва зареждане
        }
    }

    const handleDeleteSelfAccount = async () => {
        if (!apartmentNumber) {
            alert("Не е намерен номер на апартамент за изтриване.");
            return;
        }

        if (!window.confirm(`Сигурни ли сте, че искате да изтриете акаунта си за ап. ${apartmentNumber}? Това е НЕОБРАТИМО!`)) {
            return;
        }

        setIsLoading(true); // Започва зареждане
        try {
            await deleteSelfAccount(apartmentNumber);

            // Ако изтриването е успешно, навигираме
            setUser(null);
            alert("Вашият акаунт беше успешно изтрит. Излизате от системата.");
            setLogin(false);
            navigate('/');
        } catch (error) {
            setIsLoading(false); // Спира зареждането, ако има грешка

            // Обработка на грешката за повторно влизане
            if (error.message.includes('requires-recent-login')) {
                alert("⚠️ ЗАДЪЛЖИТЕЛНО: За да завършите изтриването, моля, **влезте отново** (logout/login) и опитайте отново веднага след това. Това е мярка за сигурност.");
            } else {
                alert(`Възникна грешка при изтриването: ${error.message}`);
            }
        }
    };

    return (
        <div className={styles.about_container}>

            <h2 className={styles.titles}>Относно това място!</h2>

            {!isEditing ? (
                <section className={styles.section}>
                    {text === null ? ( // ⬅️ Проверяваме дали text е null (все още се зарежда)
                        <Spinner />
                    ) : (
                        <p className={styles.content}>
                            {text || 'Няма въведена информация.'} {/* Показваме placeholder, ако текстът е празен */}
                        </p>
                    )}
                </section>
            ) :
                (<textarea
                    name="about"
                    value={text || ''} // Уверете се, че value е низ
                    onChange={e => setText(e.target.value)}
                    className={styles.areaTitle}
                    rows={10}
                ></textarea>)
            }

            {/* Бутони за редакция, само ако потребителят е Cashier/Администратор */}
            {user?.cashier && (
                <main className={styles.mainSection}>
                    <button
                        className={styles.corection}
                        onClick={addCorrection}
                        disabled={isLoading} // ⬅️ Деактивираме, ако се изтриват стари данни
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

            {/* Бутон за изтриване на стари данни */}
            {user?.cashier && !isEditing && (
                <button
                    className={styles.deleteOldButton}
                    onClick={deleteOld}
                    disabled={isLoading} // ⬅️ Деактивираме по време на зареждане
                >
                    {isLoading ? <Spinner /> : `🗑️ Изтрии данни от ${new Date().getFullYear() - 2} г.`}
                </button>
            )}

            {/* Бутон за изтриване на собствен акаунт */}
            {user?.uid && !isEditing && (
                <button
                    className={styles.deleteSelfButton}
                    onClick={handleDeleteSelfAccount}
                    disabled={!apartmentNumber || isLoading} // ⬅️ Деактивираме по време на зареждане
                >
                    {isLoading ? <Spinner /> : `Изтрий моя акаунт (Ап. ${apartmentNumber || 'Н/А'})`}
                </button>
            )}

        </div>
    )
}

export default About