import { useState, useEffect } from 'react'
import styles from './about.module.css'
import { useAuthGuard } from "@/Hooks/useAuthGuard";
import { updateData, deleteSelfAccount } from '@/Functions/FirebaseFunctions'; // ⬅️ Добавяме deleteSelfAccount
import { deleteOldFiles, deleteOldUrlsFromFirestore, deleteOldExpenses } from '@/Functions/DeleteOldData';
import { useNavigate } from 'react-router-dom';


const About = () => {

    const [correction, setCorrection] = useState(false)
    const navigate = useNavigate()
    const { dataSettings, user, setUser, setLogin } = useAuthGuard()
    const [text, setText] = useState('')
    // ВАЖНО: user.user съдържа номера на апартамента като стринг ("16")
    const apartmentNumber = user?.user;

    useEffect(() => {
        if (dataSettings && dataSettings.about) {
            setText(dataSettings.about)
        }
    }, [dataSettings])

    const addCorrection = async () => {
        if (correction) {
            // Запазване на промените
            const newData = { ...dataSettings, about: text }
            await updateData(newData)
            setCorrection(false)
        } else {
            // Влизане в режим на редактиране
            setCorrection(true)
        }
    }

    const cancel = () => {
        dataSettings.about && setText(dataSettings.about);
        setCorrection(false)
    }

    const deleteOld = async () => {
        if (!window.confirm(`Сигурни ли сте, че искате да изтриете всички стари данни (от ${new Date().getFullYear() - 2} г. и по-рано)?`)) {
            return;
        }

        await deleteOldFiles();
        await deleteOldUrlsFromFirestore();
        await deleteOldExpenses();
        alert('Изтриването на стари данни приключи успешно!');
    }

    // 🎯 НОВА ФУНКЦИЯ ЗА САМОСТОЯТЕЛНО ИЗТРИВАНЕ
    const handleDeleteSelfAccount = async () => {
        if (!apartmentNumber) {
            alert("Не е намерен номер на апартамент за изтриване.");
            return;
        }

        if (!window.confirm(`Сигурни ли сте, че искате да изтриете акаунта си за ап. ${apartmentNumber}? Това е НЕОБРАТИМО!`)) {
            return;
        }

        try {
            await deleteSelfAccount(apartmentNumber);
            setUser(null)
            alert("Вашият акаунт беше успешно изтрит. Излизате от системата.");

            setLogin(false)
            navigate('/')
        } catch (error) {
            // 3. Обработка на грешката за повторно влизане
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

            {!correction ? (
                <section className={styles.section}>
                    <p className={styles.content}>
                        {dataSettings?.about || "Няма данни"}
                    </p>
                </section>
            ) :
                (<textarea
                    name="about"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className={styles.areaTitle}
                ></textarea>)
            }

            {user?.cashier && (
                <main className={styles.mainSection}>
                    <button
                        className={styles.corection}
                        onClick={addCorrection}
                    >
                        {correction ? '💾 Запази промените' : '✏️ Корекция'}
                    </button>
                    {correction &&
                        <button
                            className={styles.rejectButton}
                            onClick={cancel}
                        >❌ Откажи</button>
                    }

                </main>
            )}

            {/* Бутон за административно изтриване на стари данни */}
            {user?.cashier && !correction && (

                <button
                    className={styles.deleteOldButton}
                    onClick={deleteOld}
                >
                    🗑️ Изтрии данни от {new Date().getFullYear() - 2} г.
                </button>

            )}

            {/* 🎯 НОВ БУТОН ЗА ИЗТРИВАНЕ НА СОБСТВЕН АКАУНТ */}
            {user?.uid && !correction && (
                <button
                    className={styles.deleteSelfButton} 
                    onClick={handleDeleteSelfAccount}
                    disabled={!apartmentNumber}
                >
                    Изтрий моя акаунт (Ап. {apartmentNumber || 'Н/А'})
                </button>
            )}

        </div>
    )
}

export default About
