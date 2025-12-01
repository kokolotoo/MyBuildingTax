import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/Styles/navBar.css';
import DataContext from '@/Context/DataContext';
import { exit } from '@/Functions/FirebaseFunctions';


export default function Navbar({ }) {
    const navigate = useNavigate()

    const { login, setLogin, setUser, user, isReady } = useContext(DataContext)
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const logOuth = async () => {
        await exit()
        navigate('/')
        setLogin(false)
        setUser(null)
        document.body.classList.remove('scroll-lock');
        setMenuOpen(false);
    }

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('scroll-lock');
        } else {
            document.body.classList.remove('scroll-lock');
        }
    }, [menuOpen]);

    const nawText = () => {

        if (!user) {
            return "Зареждане..."
        }

        if (user.cashier) {
            return "Касиер"
        } else if (user.housMenager) {
            return 'Домоуправител'
        } else {

            return `Апартамент: ${user.user}`
        }
    }


    if (login && !user) {

        return (
            <nav className={'header__nav'}>

                <p>Зареждане...</p>
            </nav>
        );
    }

    return (


        <nav className={login ? 'header__nav' : 'invisible'}>

            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>

                <Link to='/' onClick={closeMenu}>
                    Начало
                </Link>

                <button className='header__item' onClick={logOuth} >Изход</button>

            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>

            {login && user &&
                <p>{nawText()}</p>
            }
        </nav>
    );
}