import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contacts } from './components/contacts/Contacts'
import { Login } from './components/login/Login'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  )
}

export default App
