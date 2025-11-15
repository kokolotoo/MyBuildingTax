import { useState, useContext } from 'react'
import DataContext from '../../Context/DataContext'
import styles from '../../Styles/menagers.module.css'

import ChangeData from './ChangeData';

const CorectionMenagers = ({ menagers, dataSettings }) => {
    const { login, setLogin, setUser, user } = useContext(DataContext)

    return (
        <section>

            <ChangeData
                menager={menagers.houseMenager}
                dataSettings={dataSettings}
                person={'houseMenager'}

            />

            <ChangeData
                menager={menagers.cashier}
                dataSettings={dataSettings}
                person={'cashier'}

            />
            <main className={styles.taxInfo}>
                <div>
                    <p>Такса на човек живущ на 1 или 2 етаж :
                        € {dataSettings.lowTax.toFixed(2)}.
                    </p>
                    <button>Промени</button>
                </div>
                <div>
                    <p>Такса на човек живущ от 2 етаж нагоре :
                        € <b>{dataSettings.hightTax.toFixed(2)}</b>.
                    </p>
                    <button>Промени</button>
                </div>

            </main>

            
            <footer>
                <h3><b>!!!</b> Внимание <b>!!!</b></h3>
                <p>За деца под 10г. не се начислява такса</p>
            </footer>
           

        </section>
    )
}

export default CorectionMenagers
