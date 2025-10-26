import { useState } from 'react'

import './App.css'
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


