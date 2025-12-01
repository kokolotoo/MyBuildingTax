import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './Context/DataContext'
import { FloatButton } from 'antd';


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
const Navbar = lazy(() => import('./Component/Navbar/NavBar'))
const Spiner = lazy(() => import('./Helpers/Spinner'))
const ProtectedRoute = lazy(() => import('./Helpers/ProtectedRoute'))


function App() {

  return (

    <DataProvider>

      <Suspense fallback={<Spiner />}>

        <Navbar />

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

        </Routes>

      </Suspense>

      <FloatButton.BackTop visibilityHeight={180} />
    </DataProvider>

  )
}

export default App


