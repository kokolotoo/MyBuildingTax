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

    useEffect(() => {
        setCurrPerson(menager);
    }, [menager]);

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
                                name="name"
                                placeholder="Email"
                                value={currPerson.name}
                                onChange={(e) => setCurrPerson({ ...currPerson, name: e.target.value })}
                            /> :
                            currPerson.name}
                    </td>
                    <td>
                        {changeMenager ?
                            <Input
                                type="text"
                                name="phone"
                                placeholder="Email"
                                value={currPerson.pfone}
                                onChange={(e) => setCurrPerson({ ...currPerson, pfone: e.target.value })}
                            /> :
                            currPerson.pfone}
                    </td>
                    <td>
                        {changeMenager ?
                            <Input
                                type="text"
                                name="apartment"
                                placeholder="Email"
                                value={currPerson.apartment}
                                onChange={(e) => setCurrPerson({ ...currPerson, apartment: e.target.value })}
                            /> :
                            currPerson.apartment}
                    </td>
                </tr>
            </table>
            <div className={styles.buttons}>
                <button
                    type='button'
                    className={changeMenager ? styles.save_change_menager_but : styles.change_menager_but}
                    onClick={() => setChangeMenager(prev => !prev)}
                >{changeMenager ? '💾 Запази промените' : '✏️ Промени Данните'}
                </button>
                {changeMenager && <button
                    type='button'
                    className={styles.reject_but}
                    onClick={abort}
                >❌ Откажи</button>}
            </div>
        </div>
    )
}

export default ChangeData
