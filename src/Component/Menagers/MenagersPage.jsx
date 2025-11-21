import { useState, useContext } from 'react'
import Navbar from '../Navbar/NavBar'
import styles from '../../Styles/menagers.module.css'
import Spinner from '../../Helpers/Spinner'
import CorectionMenagers from './CorectionMenagers'
import DataContext from '../../Context/DataContext'


const MenagersPage = () => {

    const {dataSettings} = useContext(DataContext)
    const [currentMenagers, setCurrentMenagers] = useState({
        houseMenager: dataSettings.houseMenager,
        cashier: dataSettings.cashier,
    })
 

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
