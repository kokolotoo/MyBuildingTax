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


   
    useEffect(() => {
        
        if (dataSettings && !currentMenagers) {
            setCurrentMenagers({
                houseMenager: dataSettings.houseMenager,
                cashier: dataSettings.cashier,
            })
        }
    }, [dataSettings, currentMenagers]) 


    return (
        <main className={styles.container}>

            {currentMenagers ? (
                <CorectionMenagers
                    menagers={currentMenagers}
                    dataSettings={dataSettings} 
                />
            ) : (
                <Spinner />
            )}
        </main>
    )
}

export default MenagersPage
