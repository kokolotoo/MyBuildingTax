
import { useContext } from 'react'
import DataContext from '../../Context/DataContext'
import FrontPage from '../../Component/Home page/FrontPage'
import HomeWithLogin from '../../Component/Home page/HomeWithLogin'


const HomePage = () => {
    const { login } = useContext(DataContext)

    return (

        login ? <HomeWithLogin /> : <FrontPage />

    )
}

export default HomePage
