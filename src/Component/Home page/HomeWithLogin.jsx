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


  const shownMenagers = () => {
    // cash е безопасно за достъп, защото dataSettings е проверен
    const cashier = dataSettings.cashier;
    const houseMenager = dataSettings.houseMenager;
    const message = <Message cashier={cashier} houseMenager={houseMenager} cash={dataSettings.money} />
    infoModal(message);
  };

  const goToApartments = () => { navigate('/apartments') }
  const goToMenagers = () => { navigate('/menagers') }
  const myApartment = () => { navigate('/my-apartment') }
  const goToMonthTax = () => { navigate('/month-tax') }
  const goToExpenses = () => { navigate('/expenses') }
  const goToDiscussions = () => { navigate('/discussions') }

  // --- РЕНДЪРИНГ (Вече safe за изпълнение) ---

  return (
    <main className={styles.container}>
      {contextHolder}

      <section className={styles.list_section}>
        <ul>
          <li onClick={goToApartments}>Списък апартаменти</li>
          <li onClick={goToMonthTax}>Месечно отчитане</li>
          <li onClick={myApartment}>Моят апартамент</li>
          {/* user е проверен и е обект, достъпът до cashier/housMenager е безопасен */}
          <li onClick={user.cashier || user.housMenager ? goToMenagers : shownMenagers}>
            Управление
          </li>
          <li onClick={goToExpenses}>Разходи</li>
          <li onClick={goToDiscussions}>Дискусии</li>
        </ul>
      </section>
    </main>
  )
}

export default HomeWithLogin