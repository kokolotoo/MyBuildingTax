import { useState } from 'react'
import './App.css'
import Test from './Component/test/Test'
import FrontPage from './Pages/FrontPage'
import { DataProvider } from './Context/DataContext'

function App() {

  return (

    <DataProvider>
      <FrontPage />
      <Test />

    </DataProvider>

  )
}

export default App


