import './login.css'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { signIn } from '../../Functions/FirebaseFunctions';
import DataContext from '../../Context/DataContext';
import { Modal } from 'antd';

const loginPage = () => {
    const { setUser, setLogin } = useContext(DataContext)
    const navigate = useNavigate()
    const [modal, contextHolder] = Modal.useModal(); 
    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPass: ''
    });

    const login = async (e) => {
        e.preventDefault()
        const newUser = await signIn(loginData.loginEmail, loginData.loginPass)
        setUser(newUser)
        setLogin(true)
        successLogin(newUser.user)
       
    }

    const successLogin = (number) => {
        modal.success({
            title: 'My Building Tax',
            content: `Добре дошли апартамент: ${number}`,
            onOk() {
                setLoginData({
                    loginEmail: '',
                    loginPass: ''
                })
                navigate('/')
            },
        });
    };

    return (

        <section className='login-container'>
            {contextHolder}
            <form className='loginForm' onSubmit={login}>
                <div>
                    <label htmlFor="email">Имейл:</label><br />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        prefix={<UserOutlined />}
                        onChange={(e) => setLoginData({ ...loginData, loginEmail: e.target.value })}
                    />

                </div>
                <div>
                    <label htmlFor="password">Парола:</label><br />
                    <Input.Password
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setLoginData({ ...loginData, loginPass: e.target.value })}
                    />

                </div>

                <button type="submit">Вход</button>


                <footer className='footer'>
                    <Link to='/registration' >Нямам регистрация</Link>
                    <Link to='/forgot-pass' >Забравена парола </Link>
                    <Link to='/' >Начална страница </Link>
                </footer>

            </form>

        </section>


    );
}

export default loginPage;
