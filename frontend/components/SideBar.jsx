import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../src/assets/dp.png"
import { LuUserSearch } from "react-icons/lu";
import { RiUserSearchFill } from "react-icons/ri";

function SideBar() {
    const { user } = useSelector((state) => state.user?.userData)
  return (
    <div className='xl:w-[5%] 2xl:w-[4%] h-full flex items-center flex-col bg-[#CA4F00] py-2 gap-y-4'>
        {/* newChat */}
        <div className="h-9 w-9 bg-[#2c2125] rounded-full overflow-hidden flex justify-center items-center cursor-pointer">
            <LuUserSearch className='text-white h-6 w-6'/>
        </div>
        {/* profile */}
        <div className=' rounded-full overflow-hidden flex justify-center items-center w-9 h-9 bg-white cursor-pointer'>
            <img src={user.image || dp}/>
        </div>
    </div>
  )
}

export default SideBar