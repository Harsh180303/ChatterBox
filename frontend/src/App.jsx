import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from "../components/Loader"
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import useCurrentUser from './customHooks/useCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SearchUsers from './pages/SearchUsers'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

function App() {
  useCurrentUser()
  const { loading } = useSelector((state) => state.loader)
  const { userData, userLoading } = useSelector((state) => state.user)
  
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SOCKET_URL}`)

    socket.on('hello', (msg) => {
      console.log(msg)
    })
    
  }, [])

  if (userLoading) {
    return <Loader />
  }
  
  return (
    <>
      {loading && <Loader />}
    
      <Routes>
      <Route path="/login" element={!userData ? <LogIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/profile"/> } />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/' element={ userData ? <Home /> : <Navigate to="/login"/>} />
      <Route path='/search-users' element={userData ? <SearchUsers /> : <Navigate to='/login' />}/>
      <Route path='/profile' element={ userData ? <Profile /> : <Navigate to="/signup"/>} />
    </Routes>
    </>
  )
}

export default App
