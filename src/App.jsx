import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './Context/DataContext'
import { FloatButton } from 'antd';

// 🛑 СИНХРОННИ ИМПОРТИ (Задължителни за стабилност)
// Navbar и Spinner трябва да се заредят веднага, без Suspense.
import Navbar from './Component/Navbar/NavBar'
import Spiner from './Helpers/Spinner'

// ⚡ LAZY ИМПОРТИ (За големите страници)
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'))
const Registration = lazy(() => import('./Pages/Registracion/Registration'))
const ForgotPassPage = lazy(() => import('./Pages/Forgot-page/ForgotPage'))
const HomePage = lazy(() => import('./Pages/Home Page/HomePage'))
const Menagers = lazy(() => import('./Component/Menagers/MenagersPage'))
const Apartments = lazy(() => import('./Pages/Apartments/Apartments'))
const MyApartment = lazy(() => import('./Pages/My apartment/MyApartment'))
const MontTax = lazy(() => import('./Pages/Mont Tax/MontTax'))
const Expenses = lazy(() => import('./Pages/Expenses/Expenses'))
const Discussions = lazy(() => import('./Pages/Discussions/DiscussionsPage'))
const About = lazy(() => import('./Pages/About/About'))


function App() {

  return (

    <DataProvider>

      <Navbar />

      <Suspense fallback={<Spiner />}>

        <Routes>

          <Route path='/' element={<HomePage />} />

          <Route path='/Login' element={<LoginPage />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/forgot-pass' element={<ForgotPassPage />} />

          <Route path='/menagers' element={<Menagers />} />

          <Route path='/apartments' element={<Apartments />} />

          <Route path='/my-apartment' element={<MyApartment />} />

          <Route path='/month-tax' element={<MontTax />} />

          <Route path='/expenses' element={<Expenses />} />

          <Route path='/discussions' element={<Discussions />} />

          <Route path='/about' element={<About />} />

        </Routes>

      </Suspense>

      <FloatButton.BackTop visibilityHeight={180} />
    </DataProvider>

  )
}

export default App


