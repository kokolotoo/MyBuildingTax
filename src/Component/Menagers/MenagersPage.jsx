import { useState, useEffect } from 'react'
import Navbar from '../Navbar/NavBar'
import styles from '../../Styles/menagers.module.css'
import { getTaxData } from '../../Functions/FirebaseFunctions'
import Spinner from '../../Helpers/Spinner'
import CorectionMenagers from './CorectionMenagers'


const MenagersPage = () => {

    const [currentMenagers, setCurrentMenagers] = useState(null)
    const [dataSettings, setDataSettings] = useState(null)

    const data = async () => {
        const menagers = await getTaxData()
        setDataSettings(menagers)
        return menagers
    }

    useEffect(() => {
        const fetchData = async () => {
            const menagersResult = await data() // 👈 изчакваме резултата
            if (!menagersResult) return

            setCurrentMenagers({
                houseMenager: menagersResult.houseMenager,
                cashier: menagersResult.cashier,
            })
        }

        fetchData()
    }, [])


    return (
        <main className={styles.container}>
            <Navbar />

            {currentMenagers ?
                <CorectionMenagers
                    menagers={currentMenagers}
                    dataSettings={dataSettings}
                />
                :
                <Spinner />}

        </main>
    )
}

export default MenagersPage
