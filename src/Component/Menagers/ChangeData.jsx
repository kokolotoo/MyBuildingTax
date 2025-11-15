import { useState, useContext, useEffect } from 'react'
import styles from '../../Styles/menagers.module.css'
import { Input } from 'antd';
import { updateData } from '../../Functions/FirebaseFunctions';
import DataTable from './Table/DataTable';
import { useSuccessModal } from '../../Hooks/ModalHook';

const ChangeData = ({ menager, person, dataSettings }) => {
    const [changeMenager, setChangeMenager] = useState(false)
    const [currPerson, setCurrPerson] = useState(menager)
    const { successMessage, contextHolder, confirmModal } = useSuccessModal()

    const abort = () => {
        setCurrPerson(menager)
        setChangeMenager(false)
    }

    useEffect(() => {
        setCurrPerson(menager);
    }, [menager]);

    const saveChange = async () => {
        if (!changeMenager) {
            setChangeMenager(true);
            return;
        }

        const confirm = await confirmModal("Потвърдете промените");

        if (confirm) {
            const newData = {
                ...dataSettings,
                [person]: currPerson
            };
            await updateData(newData);
            successMessage("Успешно променени данни!");
        } else {
            setCurrPerson(menager);
        }

        setChangeMenager(false);
    };

    return (
        <div>
            {contextHolder}
            <table>
                <thead>
                    <tr>
                        <th>{person == 'cashier' ? 'Касиер' : 'Домоуправител'}</th>
                        <th>Телефон</th>
                        <th>Апартамент</th>
                    </tr>
                </thead>

                <DataTable
                    currPerson={currPerson}
                    setCurrPerson={setCurrPerson}
                    changeMenager={changeMenager}
                />

            </table>
            <div>
                <button
                    type='button'
                    className={changeMenager ? styles.save_change_menager_but : styles.change_menager_but}
                    onClick={saveChange}
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
