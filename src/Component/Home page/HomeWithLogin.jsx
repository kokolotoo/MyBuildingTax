import { useState, useContext } from 'react'
import styles from '../../Styles/homeWithLogin.module.css'
import { useNavigate } from 'react-router-dom';
import { exit } from '../../Functions/FirebaseFunctions';
import DataContext from '../../Context/DataContext'
import Navbar from '../Navbar/NavBar';

const HomeWithLogin = () => {
  const navigate = useNavigate()
  const { setUser, setLogin } = useContext(DataContext)
  const [name, setName] = useState('slider')

  const change = () => {
    setName((prev) => (prev === 'slider' ? 'slider1' : 'slider'));
  }

  const logOuth = async () => {
    await exit()
    setLogin(false)
    setUser(null)
    navigate | ('/')
  }

  return (
    <div className={styles.container}>

      <Navbar logOuth={logOuth} />



     



    </div>
  )
}

export default HomeWithLogin
