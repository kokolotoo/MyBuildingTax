import CurrentTax from './Table/CurrentTax';
import ChangeData from './ChangeData';
import styles from '@/Styles/menagers.module.css'

const CorectionMenagers = ({ menagers, dataSettings }) => {

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
            <CurrentTax dataSettings={dataSettings} />
            <p className={styles.info_money}>Налични пари : € <b>{dataSettings.money.toFixed(2)}</b></p>
            <footer>
                <h3><b>!!!</b> Внимание <b>!!!</b></h3>
                <p>За деца под 10г. не се начислява такса и не фигурират в таксуването</p>
            </footer>


        </section>
    )
}

export default CorectionMenagers
