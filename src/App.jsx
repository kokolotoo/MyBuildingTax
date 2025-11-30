import { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './Context/DataContext'
import { FloatButton } from 'antd';

const FrontPage = lazy(() => import('./Component/Home page/FrontPage'))
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

          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

          <Route path='/Login' element={<LoginPage />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/forgot-pass' element={<ForgotPassPage />} />

          <Route path='/menagers' element={
            <ProtectedRoute>
              <Menagers />
            </ProtectedRoute>
          } />

          <Route path='/apartments' element={
            <ProtectedRoute>
              <Apartments />
            </ProtectedRoute>

          } />

          <Route path='/my-apartment' element={
            <ProtectedRoute>
              <MyApartment />
            </ProtectedRoute>
          } />

          <Route path='/month-tax' element={
            <ProtectedRoute>
              <MontTax />
            </ProtectedRoute>
          } />

          <Route path='/expenses' element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } />

          <Route path='/discussions' element={
            <ProtectedRoute>
              <Discussions />
            </ProtectedRoute>
          } />

        </Routes>

      </Suspense>

      <FloatButton.BackTop visibilityHeight={180} />
    </DataProvider>

  )
}

export default App


