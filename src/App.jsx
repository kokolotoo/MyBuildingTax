import { lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './Context/DataContext'

const FrontPage = lazy(() => import('./Component/Home page/FrontPage'))
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'))
const Registration = lazy(() => import('./Pages/Registracion/Registration'))
const ForgotPassPage = lazy(() => import('./Pages/Forgot-page/ForgotPage'))
const HomePage = lazy(() => import('./Pages/Home Page/HomePage'))
const Menagers = lazy(() => import('./Component/Menagers/MenagersPage'))
const Apartments = lazy(() => import('./Pages/Apartments/Apartments'))
const MyApartment = lazy(() => import('./Pages/My apartment/MyApartment'))


function App() {

  return (

    <DataProvider>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/forgot-pass' element={<ForgotPassPage />} />
        <Route path='/menagers' element={<Menagers />} />
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/my-apartment' element={<MyApartment />} />

      </Routes>

    </DataProvider>

  )
}

export default App


