import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../src/assets/dp.png"

function SideBar() {
    const { user } = useSelector((state) => state.user?.userData)
  return (
    <div className='xl:w-[5%] 2xl:w-[4%] h-full flex items-center flex-col bg-[#CA4F00] py-2'>
        {/* profile */}
        <div className=' rounded-full overflow-hidden flex justify-center items-center w-9 h-9 bg-white'>
            <img src={user.image || dp}/>
        </div>
    </div>
  )
}

export default SideBar