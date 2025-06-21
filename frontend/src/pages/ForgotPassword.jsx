import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setResetEmail } from '../redux/userSlice'
import { hideLoader, showLoader } from '../redux/loaderSlice'

function ForgotPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const forgotPassHandler = async (e) => {
      e.preventDefault()
      setError('')

      if(!email || !email.includes('@')) {
        setError('Please enter a valid email')
        return
      }
      
      try {
        dispatch(showLoader())
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
          email
        },
      {withCredentials: true}
    )
      console.log(response)
      // toast.success("OTP sent successfully") // I'll do this later
      setEmail('')
      dispatch(setResetEmail(email))
      await navigate('/reset-password')
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to send email")
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
      
            {/*  box */}
            <div className=" w-[90%] h-fit xl:w-[35%] 2xl:w-[32%] xl:h-[86%] 2xl:h-[75%] bg-[#553927]/50 backdrop-blur-lg border border-white/5 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-y-6">
              
              <img src={logo} alt="logo" width="15%" className="xl:w-[4.75rem] 2xl:w-[5.25rem]  w-[5.5rem]"/>
      
              <h1 className="text-white text-xl xl:text-4xl 2xl:text-5xl font-bold text-shadow-bottom tracking-wide">
                Forgot password
              </h1>
      
              <form 
                onSubmit={forgotPassHandler}
                className="w-full flex flex-col justify-center items-center gap-3">
                
                <input
                  name='email'
                  autoComplete='email'
                  onChange={(e) => {setEmail(e.target.value)}}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
                />                
  
                {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
      
                <button type='submit' className="border px-4 py-3 bg-[#CA4F00] text-white rounded-md border-none w-[45%] mt-2 cursor-pointer text-lg font-semibold shadow-lg hover:shadow-inner">
                  Send OTP
                </button>

                <Link to="/try-another-way" className='text-[#CA4F00] cursor-pointer font-semibold mt-2 '>Try another way</Link>
      
              </form>
            </div>
          </div>
    )
}

export default ForgotPassword