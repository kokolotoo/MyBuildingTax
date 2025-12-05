import { useState, useContext } from 'react'
import styles from '@/Styles/homeWithLogin.module.css'
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '@/Context/DataContext'
import { useSuccessModal } from '@/Hooks/ModalHook';
import Message from './Message/Message'
import Spinner from '@/Helpers/Spinner'; // ⬅️ Добавяме Spinner

const HomeWithLogin = () => {

  const { user, dataSettings, isReady } = useContext(DataContext);
  const navigate = useNavigate();

  const { infoModal, contextHolder } = useSuccessModal();


  if (!isReady || !user || !dataSettings) {

    return <Spinner />;
  }


  const shownMenagers = () => {
    // cash е безопасно за достъп, защото dataSettings е проверен
    const cashier = dataSettings.cashier;
    const houseMenager = dataSettings.houseMenager;
    const message = <Message cashier={cashier} houseMenager={houseMenager} cash={dataSettings.money} />
    infoModal(message);
  };

  const goTo = (navigation) => { navigate(navigation) }


  return (
    <main className={styles.container}>
      {contextHolder}

      <section className={styles.list_section}>
        <ul>
          <li onClick={() => goTo('/apartments')} className={styles.slideLeft}>Списък апартаменти</li>
          <li onClick={() => goTo('/month-tax')} className={styles.slideRight} >Месечно отчитане</li>
          <li onClick={() => goTo('/my-apartment')} className={styles.slideLeft}>Моят апартамент</li>
          {/* user е проверен и е обект, достъпът до cashier/housMenager е безопасен */}
          <li onClick={user.cashier || user.housMenager ? () => goTo('/menagers') : shownMenagers}
            className={styles.slideRight}
          >
            Управление
          </li>
          <li onClick={() => goTo('/expenses')} className={styles.slideLeft} >Разходи</li>
          <li onClick={() => goTo('/discussions')} className={styles.slideRight} >Дискусии</li>
          <li onClick={() => goTo('/about')} className={styles.slideLeft} >Относно</li>
        </ul>
      </section>
    </main>
  )
}

export default HomeWithLogin