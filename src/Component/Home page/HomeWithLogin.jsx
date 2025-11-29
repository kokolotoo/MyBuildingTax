import { useState, useContext } from 'react'
import styles from '@/Styles/homeWithLogin.module.css'
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '@/Context/DataContext'
import Navbar from '../Navbar/NavBar';
import { useSuccessModal } from '@/Hooks/ModalHook';
import Message from './Message/Message'



const HomeWithLogin = () => {
  const navigate = useNavigate()
  const { user, dataSettings } = useContext(DataContext)

  const { infoModal, contextHolder } = useSuccessModal();

  const shownMenagers = () => {

    const cashier = dataSettings.cashier;
    const houseMenager = dataSettings.houseMenager;
    const message = <Message cashier={cashier} houseMenager={houseMenager} cash={dataSettings.money} />

    infoModal(message)
  };

  const goToApartments = () => {
    navigate('/apartments')
  }

  const goToMenagers = () => {
    navigate('/menagers')
  }

  const myApartment = () => {
    navigate('/my-apartment')
  }

  const goToMonthTax = () => {
    navigate('/month-tax')
  }

  const goToExpenses = () => {
    navigate('/expenses')
  }

  const goToDiscussions = ()=>{
    navigate('/discussions')
  }

  return (
    <main className={styles.container}>
      {contextHolder}
      <Navbar />

      <section className={styles.list_section}>
        <ul>
          <li onClick={goToApartments}>Списък апартаменти</li>
          <li onClick={goToMonthTax}>Месечно отчитане</li>
          <li onClick={myApartment}>Моят апартамент</li>
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
