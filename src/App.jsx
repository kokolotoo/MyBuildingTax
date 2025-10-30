import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Test from './Component/test/Test'
import FrontPage from './Pages/Home Page/FrontPage'
import HomeWithLogin from './Pages/Home Page/HomeWithLogin';
import LoginPage from './Pages/Login/LoginPage';
import { DataProvider } from './Context/DataContext'

function App() {

  return (

    <DataProvider>

      <Routes>
        <Route path= '/' element = {<FrontPage />} />
        <Route path= '/Login' element = {<LoginPage />} />
        <Route path= '/welcome' element = {<HomeWithLogin />} />
       
      </Routes>

    </DataProvider>

  )
}

export default App


