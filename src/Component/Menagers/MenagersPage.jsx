import { useState, useEffect } from 'react'
import Navbar from '../Navbar/NavBar'
import styles from '../../Styles/menagers.module.css'
import { dataMenagers } from '../../Functions/FirebaseFunctions'
import Spinner from '../../Helpers/Spinner'
import CorectionMenagers from './CorectionMenagers'


const MenagersPage = () => {

    const [currentMenagers, setCurrentMenagers] = useState(null)

    const data = async () => {
        const menagers = await dataMenagers()
        return menagers
    }

    useEffect(() => {
        const fetchData = async () => {
            const menagersResult = await data() // 👈 изчакваме резултата
            if (!menagersResult) return

            setCurrentMenagers({
                houseMenager: menagersResult["House Menager"],
                cashier: menagersResult["Cashier"],
            })
        }

        fetchData()
    }, [])


    return (
        <main className={styles.container}>
            <Navbar />

            {currentMenagers ?
                <CorectionMenagers menagers={currentMenagers} />
                :
                <Spinner />}

        </main>
    )
}

export default MenagersPage
