import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Modal } from 'antd';
import styles from './forgot.module.css'

const ForgotPage = () => {
  const [modal, contextHolder] = Modal.useModal(); // правилен ред!
  const [searchEmail, setSearchEmail] = useState('')

  const info = () => {
    modal.info({
      title: '',
      content: 'Ако има такава регистрация , ще ви бъде изпратен имейл с линк за нова парола парола',
    });
  };

  const checkForPassword = async (e) => {
    e.preventDefault()
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, searchEmail, { url: import.meta.env.VITE_URL });
      info()
      setSearchEmail('')
    } catch (error) {
      console.log(error.message);
      modal.info({
        title: '',
        content: 'Invalid email.',
      });
    }
  }

  return (
    <main className={styles.page_container}>
      {contextHolder}

      <form onSubmit={checkForPassword}>
        <label htmlFor="email">Въведете  имейл :</label>
        <input
          className={styles.input}
          type="email"
          placeholder='email'
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          required
        />
        <button className={styles.button}>Send</button>
      </form>

      <section className={styles.links}>
        <Link to='/login'>Вход</Link>
        <Link to='/registration'>Регистрация</Link>
        <Link to='/'>Начална страница</Link>
      </section>
    </main>
  );
}

export default ForgotPage;

