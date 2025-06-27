import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import SearchBox from '../../components/SearchBox'
import axios from 'axios'
import dp from '../assets/dp.png'

function SearchUsers() {
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  const handleSearch = async (text) => {
    console.log('Searching...', text)

    if(!text.trim()) {
      setResults([])
      return
    }

    if(text.trim().length < 2) {
      // setResults([])
      return
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/search-users`, {
        params: { userName: text },
        withCredentials: true
      }, 
    )

    console.log(response?.data?.users)
    setResults(response?.data?.users)
    setError(null)

    } catch (error) {
      console.log(error)
      setResults([])
      setError('No users found')
    }
  }
  
  return (
    <div className="h-screen w-screen bg-[#2c2125] flex overflow-x-hidden text-white">
    {/* Sidebar */}
      <div className='xl:w-[5%] 2xl:w-[4%] w-[4%] h-full'>
        <SideBar/>
      </div>

      {/* Search Area */}
      <div className='w-[30%] h-full bg-[#2c2125] p-4 flex flex-col border-x border-white/5 text-white'>
        <SearchBox onSearch={handleSearch} onClose={() => {setResults([]), setError(null)} }/>

        {/* Result list */}
        <div className='mt-4 flex flex-col gap-y-2'>
          {results.length > 0 ? (
            results.map((user) => (
              <div 
                key={user._id}
                className='bg-[#181818] p-3 rounded-md flex gap-x-3 items-center'
              >
                <img 
                  src={user.image || dp}
                  draggable="false"
                  alt='Profile pic'
                  className='h-10 w-10 rounded-full object-cover'
                />
                <div className='flex flex-col '>
                  <p className='font-semibold'>{user.userName}</p>
                  <p className='text-sm'>{user.name}</p>
                </div>
              </div>
            ))
          ) : (error && <p className='text-sm text-red-400 mt-2'>{error}</p>)}
        </div>
      </div>

      {/* Message Area */}
      <div className='text-white flex-1 p-6'>
        MessageArea
      </div>
    </div>
  )
}

export default SearchUsers