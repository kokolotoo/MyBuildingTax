import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import apartments from './Residents/Apartmets'
import Test from './Component/test/Test'
import { DataProvider } from './Context/DataContext'

function App() {

  return (

    <DataProvider>

      <Test />

    </DataProvider>

  )
}

export default App


