import './login.css'
import { Link } from 'react-router-dom';



const loginPage = () => {

  
    return (
      
            <section className='login-container'>

                <form className='loginForm' >
                    <div>
                        <label htmlFor="email">Email:</label><br />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            required

                        />

                    </div>
                    <div>
                        <label htmlFor="password">Password:</label><br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />

                    </div>
                   
                    <button type="submit">Login</button>
                   

                    <footer className='footer'>
                        <Link to='/registration' >Нямам регистрация</Link>
                        <Link to='/forgot-page' >Забравена парола </Link>
                        <Link to='/' >Начална страница </Link>
                    </footer>

                </form>

            </section>

       
    );
}

export default loginPage;
