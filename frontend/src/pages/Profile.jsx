import React, { useState } from 'react'
import dp from '../assets/dp.png'
import { IoCamera } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { email, userName } = useSelector((state) => state.user?.userData?.user)
  // console.log({email, userName})
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [error, setError] = useState('')
  return (
    <>
      {/* Arrow button */}
      <div className="sticky top-0 left-0 z-10 w-full flex items-center gap-2 px-5 py-2 bg-[#CA4F00] text-white shadow-md shadow-black/30 text-xl font-semibold">
  <IoIosArrowRoundBack
    className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform duration-150"
    onClick={() => navigate('/')}
  />
  <span className="drop-shadow-sm tracking-wide">Profile</span>
</div>


      <div className="min-h-screen w-full bg-[#2c2125] flex justify-center items-center flex-col relative overflow-auto gap-y-5">
        {/* Box  */}
        <div className="my-10 w-[90%] h-fit xl:w-[35%] 2xl:w-[32%] xl:h-[86%] 2xl:h-[75%] bg-[#553927]/50 backdrop-blur-lg border border-white/5 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center gap-y-6">
          <div className="relative w-[10rem] h-[10rem]">
            {/* BLUR RING */}
            <div className="absolute inset-0 rounded-full border-8 border-[#CA4F00] blur-sm opacity-80"></div>
            <div className=" relative w-full h-full rounded-full bg-white">
              <div className="w-full h-full overflow-hidden rounded-full   border-2 border-[#CA4F00]">
                <img
                  draggable="false"
                  src={dp}
                  className="w-full h-full object-cover "
                />
              </div>
              <IoCamera className="absolute bottom-6 right-1 p-[2px] w-6 h-6 cursor-pointer rounded-full bg-white" />
            </div>
          </div>

          {/* FORM */}
          <form className="w-full flex flex-col justify-center items-center gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
            />
            <input
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              placeholder="About"
              className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
            />
            <input
              readOnly
              value={email}
              className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-default bg-[#2c2125]/80"
            />
            <input
              readOnly
              value={userName}
              className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-default bg-[#2c2125]/80"
            />

            {/* ERROR */}
            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="border px-4 py-3 bg-[#CA4F00] text-white rounded-md border-none w-[45%] mt-2 cursor-pointer text-lg font-semibold shadow-lg hover:shadow-inner "
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile
