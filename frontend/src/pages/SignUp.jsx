import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { hideLoader, showLoader } from '../redux/loaderSlice'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setshow] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')

    // validation
    if(!userName || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if(password !== confirmPassword) {
      setError('Password does not match!')
      return
    }
    
    try {
      dispatch(showLoader)
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      )

      dispatch(setUserData(response.data))
      
      setUserName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate('/profile')

    } catch (error) {
      setError(error?.response?.data?.message || "Signup failed")
    } finally {
      dispatch(hideLoader())
    }
  }

  return (
    <div className="relative h-screen w-full bg-[#2c2125] flex justify-center items-center overflow-hidden">
      {/* Glowing background blur */}
      <div
        className="absolute w-[24rem] h-[28rem] rounded-full bg-[#CA4F00]/30 blur-[70px] animate-softGlow"
        style={{ top: '20%', left: '30%' }}
      ></div>

      {/* SignUp box */}
      <div className=" w-[90%] h-fit xl:w-[35%] 2xl:w-[32%] xl:min-h-[86%] 2xl:h-[75%] bg-[#553927]/50 backdrop-blur-lg border border-white/5 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-y-6">
        <img
          src={logo}
          alt="logo"
          width="15%"
          className="xl:w-[4.75rem] 2xl:w-[5.25rem] w-[5.5rem]"
        />

        <h1 className="text-white text-xl xl:text-4xl 2xl:text-5xl font-bold text-shadow-bottom tracking-wide text-balance text-center">
          Welcome to ChatterBox
        </h1>

        <form
          onSubmit={handleSignUp}
          className="w-full flex flex-col justify-center items-center gap-3"
        >
          <input
            onChange={(e) => {
              setUserName(e.target.value)
            }}
            value={userName}
            type="text"
            placeholder="Username"
            className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
          />

          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
            type="email"
            placeholder="Email"
            className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
          />

          <div className="border w-[100%] lg:w-[70%] rounded-sm text-white bg-[#2c2125]/80 flex items-center">
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
              type={show ? 'text' : 'password'}
              placeholder="Password"
              minLength={6}
              className="w-[75%] xl:w-[80%] h-full outline-none px-4 py-3 cursor-pointer"
            />
            <span
              className="lg:border-l-2 px-4 w-[25%] xl:w-[20%] flex justify-center items-center cursor-pointer h-full"
              onClick={() => setshow(!show)}
            >
              {show ? 'hide' : 'show'}
            </span>
          </div>

          <input 
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type='password'
            placeholder='Confirm Password'            
            className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
          />

          {error && <p className="text-red-500 font-medium text-sm">{error}</p>}

          <button
            type="submit"
            className="border px-4 py-3 bg-[#CA4F00] text-white rounded-md border-none w-[45%] mt-2 cursor-pointer text-lg font-semibold shadow-lg hover:shadow-inner"
          >
            Sign Up
          </button>

          <p className="text-white mt-2 text-balance text-center">
            Already Have An Account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#CA4F00] cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
