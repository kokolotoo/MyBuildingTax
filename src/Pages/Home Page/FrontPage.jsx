import React from 'react'
import styles from "./frontPage.module.css"
import { Link } from 'react-router-dom'

const FrontPage = () => {
  return (

    <section className={styles.home_container}>
      <div className={styles.overlay}></div>
      <main className={styles.home_card}>

        <h1 className={styles.home_title}> MyBuildingTax</h1>

        <p className={styles.home_subtitle}>
          Отчитане на месечните такси във вашия вход.
        </p>

        <div className={styles.buttons}>
          <button className={styles.home_button}>
            <Link to={'/Login'}>Вход</Link>
          </button>
          <button className={styles.reg_button}>
            Регистрация
          </button>
        </div>

      </main>

      <footer className={styles.home_footer}>
        <p>© {new Date().getFullYear()} MyBuildingTax — Всички права запазени.</p>
      </footer>
    </section>



  )
}

export default FrontPage
