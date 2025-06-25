import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoCloseSharp } from 'react-icons/io5'

function ChatList() {
  const [showSearch, setShowSearch] = useState(false)
  const wrapperRef = useRef(null)
  const toggleSearch = () => setShowSearch((prev) => !prev)

  useEffect(() => {

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setShowSearch(false)
        }
    }
    
    if(showSearch) {
        document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearch])
  
  return (
    // BOX
    <div className="w-full lg:w-[30%] h-full  border-x-1 bg-[#2c2125] backdrop-blur-lg border border-white/5 p-4 shadow-lg flex flex-col">
      {/* search bar */}

        {!showSearch ? (
            <div className="bg-[#181818] p-3 w-fit rounded-md cursor-pointer" onClick={toggleSearch}>
          <IoSearch />
        </div>
        ) : 
        (
            <form ref={wrapperRef} className="relative w-full flex items-center rounded-md gap-x-2 border border-[#2c2c2c] focus-within:shadow-[0_0_0_2px_#CA4F00] transition-all duration-300">
          <input
            type="text"
            placeholder="Search"
            className="peer w-full pl-10 pr-4 py-2 rounded-md bg-[#181818] text-white focus:outline-none"
          />

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#CA4F00] transition-colors ">
            <IoSearch />
          </span>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#CA4F00] cursor-pointer" onClick={toggleSearch}>
            <IoCloseSharp />
          </span>
        </form>
        )}
      
    </div>
  )
}

export default ChatList
