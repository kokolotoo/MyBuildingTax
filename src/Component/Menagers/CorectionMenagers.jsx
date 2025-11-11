import { useState, useContext } from 'react'
import DataContext from '../../Context/DataContext'
import styles from '../../Styles/menagers.module.css'

import ChangeData from './ChangeData';

const CorectionMenagers = ({ menagers }) => {
    const { login, setLogin, setUser, user } = useContext(DataContext)
    const [changeMenager, setChangeMenager] = useState(false)
    const [changeCashier, setChangeCashier] = useState(false)



    return (
        <section>

            <ChangeData
                menager={menagers.houseMenager}
                person={'House Menager'}
            />

            <ChangeData
                menager={menagers.cashier}
                person={'Cashier'}
            />

        </section>
    )
}

export default CorectionMenagers
