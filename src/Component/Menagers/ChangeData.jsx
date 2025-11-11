import { useState, useContext, useEffect } from 'react'
import styles from '../../Styles/menagers.module.css'
import { Input } from 'antd';

const ChangeData = ({ menager, person }) => {
    const [changeMenager, setChangeMenager] = useState(false)
    const [currPerson, setCurrPerson] = useState(menager)

    const abort = () => {
        setCurrPerson(menager)
        setChangeMenager(false)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>{person == 'Cashier' ? 'Касиер' : 'Домоуправител'}</th>
                        <th>Телефон</th>
                        <th>Апартамент</th>
                    </tr>
                </thead>

                <tr>
                    <td>
                        {changeMenager ?
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={currPerson.name}
                            /> :
                            currPerson.name}
                    </td>
                    <td>
                        {changeMenager ?
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={currPerson.pfone}
                            /> :
                            currPerson.pfone}
                    </td>
                    <td>
                        {changeMenager ?
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={currPerson.apartment}
                            /> :
                            currPerson.apartment}
                    </td>
                </tr>
            </table>
            <div className={styles.buttons}>
                <button
                    className={changeMenager ? styles.save_change_menager_but : styles.change_menager_but}
                    onClick={() => setChangeMenager(prev => !prev)}
                >{changeMenager ? 'Запази промените' : 'Промени Данните'}
                </button>
                {changeMenager && <button
                    className={styles.reject_but}
                    onClick={abort}
                >Откажи</button>}
            </div>
        </div>
    )
}

export default ChangeData
