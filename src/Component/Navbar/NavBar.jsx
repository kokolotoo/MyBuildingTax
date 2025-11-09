import { useState, useEffect, useContext } from 'react';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/navBar.css';
import DataContext from '../../Context/DataContext';


export default function Navbar({ logOuth }) {
    const navigate = useNavigate()
    const { login, user } = useContext(DataContext)
    const [menuOpen, setMenuOpen] = useState(false);



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }




    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('scroll-lock');
        } else {
            document.body.classList.remove('scroll-lock');
        }
    }, [menuOpen]);

    return (

        <nav className='header__nav'>

            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>

                <Link to='/'  onClick={closeMenu}>
                    Начало
                </Link>


                <button className='header__item' onClick={logOuth} >Изход</button>


            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
            <p>{user.cashier ? 'Касиер' : `Апартамент: ${user.user}`}</p>
        </nav>
    );
}
