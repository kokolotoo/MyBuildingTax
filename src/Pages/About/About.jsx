import { useState, useEffect } from 'react'
import styles from './about.module.css'
import { useAuthGuard } from "@/Hooks/useAuthGuard";
import { updateData } from '@/Functions/FirebaseFunctions';
import { deleteOldFiles, deleteOldUrlsFromFirestore, deleteOldExpenses } from '@/Functions/DeleteOldData';




const About = () => {
    const [text, setText] = useState('')
    const [correction, setCorrection] = useState(false)

    const { dataSettings, user } = useAuthGuard()


    const addCorrection = async () => {
        if (!correction) {
            //код за промяна
            const newData = { ...dataSettings, about: text }
             await updateData(newData)

            setCorrection(true)
        } else {
            setCorrection(false)
        }

    }
    useEffect(() => {
        dataSettings.about && setText(dataSettings.about)
    }, [])

    const cancel = () => {
        setCorrection(false)
    }

    const deleteOld = async () => {
        await deleteOldFiles();
        await deleteOldUrlsFromFirestore();
        await deleteOldExpenses();
    }
    return (
        <div className={styles.about_container}>

            <h2 className={styles.titles}>Относно това място !</h2>

            {!correction ? (
                <section className={styles.section}>
                    <p className={styles.content}>
                        {dataSettings?.about ? dataSettings.about : "Няма данни"}
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
                        {correction ? 'Запази промените' : 'Корекция'}
                    </button>
                    {correction &&
                        <button
                            className={styles.rejectButton}
                            onClick={cancel}
                        >❌ Откажи</button>
                    }

                </main>
            )}

            {user?.cashier && !correction && (

                <button
                    className={styles.deleteOldButton}
                    onClick={deleteOld}
                >
                    Изтрии данни от {new Date().getFullYear() - 2} г.
                </button>

            )}

        </div>
    )
}

export default About
