import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dp from "../src/assets/dp.png"
import { LuUserSearch } from "react-icons/lu";
import { RiUserSearchFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setUserData } from '../src/redux/userSlice'
import { IoMdHome } from "react-icons/io";
import { FaHome } from 'react-icons/fa';

function SideBar() {
    const { user } = useSelector((state) => state.user?.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = async() => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {withCredentials: true})

        dispatch(setUserData(null))
        console.log('Logged out successfully')
        // toast
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
    }
  return (
    <div className='w-full h-full flex items-center flex-col bg-[#161717] py-2 gap-y-4'>
        {/* Home */}
        <div className="h-9 w-9 overflow-hidden flex justify-center items-center cursor-pointer " onClick={() => navigate('/')}>
            <FaHome className='text-white h-6 w-6 hover:text-[#CA4F00]'/>
        </div>
        {/* newChat */}
        <div className="h-9 w-9 overflow-hidden flex justify-center items-center cursor-pointer " onClick={() => navigate('/search-users')}>
            <LuUserSearch className='text-white h-6 w-6 hover:text-[#CA4F00]'/>
        </div>
        {/* profile */}
        <div className=' rounded-full overflow-hidden flex justify-center items-center w-9 h-9 bg-white cursor-pointer' onClick={() => navigate('/profile')}>
            <img draggable="false" src={user.image || dp}/>
        </div>

        {/* Settings */}
        <div className="h-9 w-9 hover:text-[#CA4F00] overflow-hidden flex justify-center items-center cursor-pointer">
          <IoSettingsSharp className='h-6 w-6'/>
        </div>

        {/* logOut */}
        <div className="h-9 w-9 hover:text-[#CA4F00] overflow-hidden flex justify-center items-center cursor-pointer" onClick={handleLogOut}>
          <TbLogout2 className='h-6 w-6'/>
        </div>
    </div>
  )
}

export default SideBar