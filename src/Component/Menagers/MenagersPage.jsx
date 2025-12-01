import { useState, useEffect } from 'react'
import { useAuthGuard } from '@/Hooks/useAuthGuard' // ⬅️ НОВ ИМПОРТ

import styles from '@/Styles/menagers.module.css'
import Spinner from '@/Helpers/Spinner'
import CorectionMenagers from './CorectionMenagers'


const MenagersPage = () => {

    const { user, dataSettings, isReady } = useAuthGuard()
    const [currentMenagers, setCurrentMenagers] = useState(null)

    if (!isReady || !user || !dataSettings) return <Spinner />

    if (!user.cashier && !user.housMenager) {
        
        return <p className={styles.accessDenied}>Нямате право на достъп до тази страница.</p>
    }


    // 4. Когато dataSettings се зареди → попълваме currentMenagers (Сега е безопасно!)
    useEffect(() => {
        // Проверяваме дали dataSettings съществува
        if (dataSettings && !currentMenagers) {
            setCurrentMenagers({
                houseMenager: dataSettings.houseMenager,
                cashier: dataSettings.cashier,
            })
        }
    }, [dataSettings, currentMenagers]) // Добавяме dataSettings като зависимост


    return (
        <main className={styles.container}>

            {/* 5. Рендираме CorectionMenagers само ако currentMenagers е наличен */}
            {currentMenagers ? (
                <CorectionMenagers
                    menagers={currentMenagers}
                    dataSettings={dataSettings} // Вече гарантирано наличен
                />
            ) : (
                <Spinner />
            )}
        </main>
    )
}

export default MenagersPage
