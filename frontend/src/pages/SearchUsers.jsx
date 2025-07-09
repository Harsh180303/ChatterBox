import React, { useState, useCallback, useRef } from 'react'
import SideBar from '../../components/SideBar'
import SearchBox from '../../components/SearchBox'
import axios from 'axios'
import dp from '../assets/dp.png'
import chatBtn from '../assets/logo.png'
import { FaCommentDots } from "react-icons/fa"
import ChatWindow from '../../components/ChatWindow'
import { useDispatch } from 'react-redux'
import { setSelectedChat } from '../redux/chatSlice'
import { showLoader, hideLoader } from '../redux/loaderSlice'

function SearchUsers() {
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  // useCallback - prevents infinite re-renders (infinit api calls)
  const handleSearch = useCallback(async (text) => {
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
    if(response?.data?.users.length) {
      setResults(response?.data?.users)
      setError(null)
    } else {
      setResults([])
      setError('No users found')
    }

    } catch (error) {
      console.log(error)
      setResults([])
      setError('Failed to search users')
    }
  }, [])

  const handleAccessChat = async (receiverId) => {

    if (!receiverId || typeof receiverId !== 'string') {
      console.warn('Invalid receiverId. API call skipped.')
      return
    }

    try {
      dispatch(showLoader())
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/chat/access-chat/${receiverId}`, {withCredentials: true}
      )

      console.log('Response ', response)
      
      if(response?.data?.success && response.data.chat) {
        const chat = response.data.chat
        dispatch(setSelectedChat(chat))
        setResults([]) // clear search
      } else {
        console.warn('Unexpected API response structure: ', response)
      }
    } catch (error) {
      console.log('Access chat error', error?.response?.data?.message || error.message)
    } finally {
      dispatch(hideLoader())
    }
  }
  
  return (
    <div className="h-screen w-screen bg-[#2c2125] flex overflow-x-hidden text-white">
      {/* Sidebar */}
      <div className="xl:w-[5%] 2xl:w-[4%] w-[4%] h-full">
        <SideBar />
      </div>

      {/* Search Area */}
      <div 
        ref={wrapperRef}
        className="w-[30%] h-full bg-[#2c2125] p-4 flex flex-col border-x border-white/5 text-white"
      >
        <SearchBox
          onSearch={handleSearch}
          onClose={() => {
            setResults([]), setError(null)
          }}
          wrapperRef={wrapperRef}  // pass to the child
        />

        {/* Result list */}
        <div className="mt-4 flex flex-col gap-y-2">
          {results.length > 0
            ? results.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#181818] p-3 rounded-md flex justify-between items-center"
                >
                  <div className='flex gap-x-3 items-center'>
                    <img
                      src={user.image || dp}
                      draggable="false"
                      alt="Profile pic"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col ">
                      <p className="font-semibold">{user.userName}</p>
                      <p className="text-sm">{user.name}</p>
                    </div>
                  </div>

                  {/* send-message button */}
                  <button 
                    onClick={() => {handleAccessChat(user._id)}}
                    className='flex items-center cursor-pointer w-fit h-full'
                  >
                    {/* <img src={chatBtn} width={30}/> */}
                    < FaCommentDots aria-label='Chat' className='h-5 w-5 hover:text-[#CA4F00] transition-all duration-300' />
                  </button>
                </div>
              ))
            : error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </div>

      {/* Message Area */}
      <div className="text-white flex-1"><ChatWindow /></div>
    </div>
  )
}

export default SearchUsers