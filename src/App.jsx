import { useState, lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Test from './Component/test/Test'
//import FrontPage from './Pages/Home Page/FrontPage'
//import HomeWithLogin from './Pages/Home Page/HomeWithLogin';
//import LoginPage from './Pages/Login/LoginPage';
import { DataProvider } from './Context/DataContext'

const FrontPage = lazy(() => import('./Pages/Home Page/FrontPage'))
const HomeWithLogin = lazy(() => import('./Pages/Home Page/HomeWithLogin'))
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'))
const Registration = lazy(() => import('./Pages/Registracion/Registration'))
const ForgotPassPage = lazy(() => import('./Pages/Forgot-page/ForgotPage'))


function App() {

  return (

    <DataProvider>


      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/welcome' element={<HomeWithLogin />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/forgot-pass' element={<ForgotPassPage />} />

      </Routes>

    </DataProvider>

  )
}

export default App


