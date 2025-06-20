import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

function ResetPassword() {
  const { resetEmail } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [show, setshow] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetPassHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!newPassword || !otp) {
      setError('Please fill required fields')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        },
        { withCredentials: true }
      )
      console.log(response) // toase.success("Password resest successfully")
      setError('')
      setOtp('')
      setNewPassword('')
      navigate('/login')
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-full bg-[#2c2125] flex justify-center items-center">
      {/* Glowing background blur */}
      <div
        className="absolute w-[24rem] h-[28rem] rounded-full bg-[#CA4F00]/30 blur-[70px] animate-softGlow"
        style={{ top: '20%', left: '30%' }}
      ></div>

      {/* SignUp box */}
      <div className="xl:w-[35%] 2xl:w-[32%] xl:h-[86%] 2xl:h-[75%] bg-[#553927]/50 backdrop-blur-lg border border-white/5 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-y-6">
        <img
          src={logo}
          alt="logo"
          width="15%"
          className="xl:w-[4.75rem] 2xl:w-[5.25rem]"
        />

        <h1 className="text-white xl:text-4xl 2xl:text-5xl font-bold text-shadow-bottom">
          Login to ChatterBox
        </h1>

        <form
          onSubmit={resetPassHandler}
          className="w-full flex flex-col justify-center items-center gap-3"
        >
          <p className="text-[#CA4F00] font-semibold mt-2 ">
            OTP sent to {resetEmail}
          </p>

          <input
            // onChange={(e) => setOtp(e.target.value)}
            onChange={(e) => {
              const value = e.target.value
              if (/^\d*$/.test(value)) setOtp(value)
            }}
            value={otp}
            minLength={6}
            maxLength={6}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="OTP"
            className="border w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
          />

          <div className="border w-[70%] rounded-sm text-white bg-[#2c2125]/80 flex items-center">
            <input
              minLength={6}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="New Password"
              type={show ? 'text' : 'password'}
              className="w-[80%] h-full outline-none px-4 py-3 cursor-pointer"
            />
            <span
              className="border-l-2 px-4 w-[20%] flex justify-center items-center cursor-pointer h-full"
              onClick={() => setshow(!show)}
            >
              {show ? 'hide' : 'show'}
            </span>
          </div>
          {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className={`border px-4 py-3 bg-[#CA4F00] text-white rounded-md border-none w-[45%] mt-2 cursor-pointer text-lg font-semibold shadow-lg hover:shadow-inner ${
              loading ? 'cursor-not-allowed' : ''
            }`}
          >
            {/* Login */}
            {loading === true ? 'Loading...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
