import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
