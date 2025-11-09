import { useState, useContext } from 'react'
import DataContext from '../../Context/DataContext'
import styles from '../../Styles/menagers.module.css'

const CorectionMenagers = ({ menagers }) => {
    const { login, setLogin, setUser, user } = useContext(DataContext)




    return (
        <section>
            <p>{menagers.cashier.name}</p>
            <p>{menagers.houseMenager.name}</p>
        </section>
    )
}

export default CorectionMenagers
