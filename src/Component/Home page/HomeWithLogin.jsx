import { useState, useContext } from 'react'
import styles from '../../Styles/homeWithLogin.module.css'
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../../Context/DataContext'
import Navbar from '../Navbar/NavBar';
import { useSuccessModal } from '../../Hooks/ModalHook';
import { dataMenagers } from '../../Functions/FirebaseFunctions';
import Message from './Message/Message'

const HomeWithLogin = () => {
  const navigate = useNavigate()
  const { user, setUser, setLogin } = useContext(DataContext)

  const { infoModal, contextHolder } = useSuccessModal();

  const shownMenagers = async () => {
    const menagers = await dataMenagers()

    const cashier = menagers["Cashier"];
    const houseMenager = menagers["House Menager"];

    const message =  <Message cashier={cashier} houseMenager={houseMenager}/>

    infoModal(message)
  };

  const goToMenagers = () => {
    navigate('/menagers')
  }

  return (
    <main className={styles.container}>
      {contextHolder}
      <Navbar />

      <section className={styles.list_section}>
        <ul>
          <li>Списък апартаменти</li>
          <li>Месечно отчитане</li>
          <li>Моят апартамент</li>
          <li onClick={user.cashier ? goToMenagers : shownMenagers}>Управление</li>
        </ul>
      </section>

    </main>
  )
}

export default HomeWithLogin
