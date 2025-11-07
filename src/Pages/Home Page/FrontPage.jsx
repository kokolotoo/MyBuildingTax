import React, { useState } from 'react';
import styles from "./frontPage.module.css"
import { Link } from 'react-router-dom'
import AboutModal from '../../Helpers/Modal'
import Test from '../../Component/test/Test';

const FrontPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (

    <section className={styles.home_container}>
      <div className={styles.overlay}></div>
      <main className={styles.home_card}>

        <h1 className={styles.home_title}> My Building Tax</h1>

        <p className={styles.home_subtitle}>
          Отчитане на месечните такси във вашия вход.
        </p>

        <div className={styles.buttons}>

          <Link to={'/Login'} className={styles.home_button}>Вход</Link>

          <button className={styles.reg_button}>
            Регистрация
          </button>

          <button className={styles.abouth_button}
            onClick={showModal}
          >Относно</button>
        </div>

   

        <AboutModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          message={`Тестова страница за отчитане, месечните такси на живущите в
             блок 319 вх.Д.
            Моля подминете  ако не сте жител на този вход !`}
        />
      </main>

      <footer className={styles.home_footer}>
        <p>© {new Date().getFullYear()} MyBuildingTax — Всички права запазени.</p>
      </footer>
    </section>



  )
}

export default FrontPage
