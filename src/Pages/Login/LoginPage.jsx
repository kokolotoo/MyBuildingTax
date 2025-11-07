import './login.css'
import { Link } from 'react-router-dom';

const loginPage = () => {

  



    return (
        <main className='page_container_login'>
            <section className='login-container'>

                <form >
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
                    <button type="button" >Login with Google</button>

                    <footer className='footer'>
                        <Link to='/registration' >Нямам акаунд</Link>
                        <Link to='/forgot-page' >Забравена парола </Link>
                        <Link to='/' >Начална страница </Link>
                    </footer>

                </form>

            </section>

        </main>
    );
}

export default loginPage;
