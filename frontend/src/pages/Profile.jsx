import React, { useState } from 'react'
import dp from '../assets/dp.png'
import { IoCamera } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
import { showLoader, hideLoader } from '../redux/loaderSlice'
import { setUserData } from '../redux/userSlice'

function Profile() {
  const { email, userName, name, image, about: userAbout } = useSelector(
    (state) => state.user?.userData?.user
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newName, setNewName] = useState(name || '')
  const [frontendImage, setFrontendImage] = useState(image || dp)
  const [backendImage, setBackendImage] = useState(null)
  const [about, setAbout] = useState( userAbout || '')
  const [error, setError] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  const photo = useRef()

  const submitProfile = async (e) => {
    e.preventDefault()
    setError('')
    dispatch(showLoader())

    if(!newName && !about && !backendImage) {
      setError("Please update at least one field before saving.")
      dispatch(hideLoader())
      return
    }

    try {
      const formData = new FormData()
      if(newName?.trim()) {
        formData.append('name', newName.trim())
      }
      
      if(about?.trim()) {
        formData.append('about', about.trim())
      }
      
      if(backendImage) {
        formData.append('image', backendImage)
      }
      
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
        formData,
        { withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      dispatch(setUserData(response?.data))
      navigate('/')
    } catch (error) {
      console.error('Profile update failed:', error);
      setError('Failed to update profile')
    } finally {
      dispatch(hideLoader())
    }
  }

  const handleImage = async (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

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
            <div className=" relative w-full h-full rounded-full bg-white" >
              <div className="w-full h-full overflow-hidden rounded-full flex justify-center items-center border-2 border-[#CA4F00]">
                <img
                  draggable="false"
                  src={frontendImage}
                  className="w-full h-full object-cover "
                  onClick={() => setIsPreviewOpen(true)}
                />
              </div>
              <IoCamera className="absolute bottom-6 right-1 p-[2px] w-6 h-6 cursor-pointer rounded-full bg-white" onClick={(e) => photo?.current?.click()}/>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={submitProfile}
            className="w-full flex flex-col justify-center items-center gap-3"
          >
          {/* image */}
            <input type='file' hidden accept='image/*' ref={photo} onChange={handleImage}></input>
            <input
              name="name"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              type="text"
              placeholder="Name"
              className="border w-[100%] lg:w-[70%] rounded-sm px-4 py-3 text-white cursor-pointer bg-[#2c2125]/80"
            />
              
              {/* <select onChange={(e) => setAbout(e.target.value)}>
                <option value="Just getting started 💡">Just getting started 💡</option>
                <option value="Building my journey 💻">Building my journey 💻</option>
                <option value="Exploring code & coffee ☕">Exploring code & coffee ☕</option>
                <option value="Future full-stack wizard 🧙‍♂️">Future full-stack wizard 🧙‍♂️</option>
                <option value="On a mission to learn 👨‍💻">"On a mission to learn 👨‍💻</option>
                <option value="Dreaming in JavaScript ✨">Dreaming in JavaScript ✨</option>
                <option value="Creating with code ✍️">Creating with code ✍️</option>
              </select> */}
            <input
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              name="about"
              maxLength={30}
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
          {isPreviewOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsPreviewOpen(false)}
            >
              <img 
                draggable="false"
                src={frontendImage}
                alt='Preview'
                className="w-[90%] max-w-[35rem] rounded-lg shadow-xl border-4 border-white"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
              />
            </div>
          )}
      </div>
    </>
  )
}

export default Profile
