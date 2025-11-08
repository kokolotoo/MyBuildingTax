import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import useRegistration from '../../hooks/useRegistration';
import styles from './reg.module.css'
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { sumbmit } from '../../Functions/FirebaseFunctions';
import DataContext from '../../Context/DataContext';


const Registration = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { setUser, setLogin } = useContext(DataContext)
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState(
        {
            mail: '',
            password: '',
            confirmPassword: '',
            apartment: null

        }
    )

    const registration = async (e) => {
        e.preventDefault()
        const newUser = await sumbmit(formdata)
        setUser(newUser)
        setFormdata({
            mail: '',
            password: '',
            confirmPassword: '',
            apartment: null

        })
        setLogin(true)
        console.log(newUser);
        if (newUser) { navigate('/') }
    }


    return (
        <form className={styles.container} onSubmit={registration}>

            <Space direction="vertical"  >
                <label htmlFor="Email">Имейл</label>
                <Input
                    placeholder="Email"
                    required
                    prefix={<UserOutlined />}
                    value={formdata.mail}
                    onChange={(e) =>
                        setFormdata({ ...formdata, mail: e.target.value })
                    }
                />
                <hr />
            </Space>

            <Space direction='vertical'>
                <label htmlFor="Password">Парола</label>
                <Input.Password
                    placeholder="Password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    required
                    value={formdata.password}
                    onChange={(e) =>
                        setFormdata({ ...formdata, password: e.target.value })
                    }
                />

                <label htmlFor="Email">Повтори парола </label>
                <Input.Password
                    placeholder="Confirm password"
                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    required
                    value={formdata.confirmPassword}
                    onChange={(e) =>
                        setFormdata({ ...formdata, confirmPassword: e.target.value })
                    }
                />
            </Space>

            <Space direction='vertical'>
                <label htmlFor="Apartment">Апартамент № </label>
                <Input
                    type='number'
                    status='error'
                    min={'0'}
                    max={'24'}
                    required
                    value={formdata.apartment}
                    onChange={(e) => {
                        const number = e.target.value
                        setFormdata({ ...formdata, apartment: Number(number) })
                    }}
                />
            </Space>
            <br />
            <button type='submit' className={styles.submitBtn}>Регистрация</button>

            <br />
            <Link to={'/login'}>Имам регистрация</Link>
            <br />
            <Link to={'/'}>Начална страница</Link>

        </form>
    );
}

export default Registration;
