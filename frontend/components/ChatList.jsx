import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoSearch } from 'react-icons/io5'
import SearchBox from './SearchBox'
import dummyChats from '../static/dummyChats'
import dp from "../src/assets/dp.png"
import { RiPushpin2Fill } from "react-icons/ri"
import { FaBellSlash } from "react-icons/fa"
import { setSelectedChat } from '../src/redux/chatSlice'
import axios from 'axios'

const ChatList = () => {
  const { userData } = useSelector((state) => state.user)
  const currentUserId = userData.user._id
  // console.log('currentUserId ',currentUserId)

  const [showSearch, setShowSearch] = useState(false)
  const [chats, setChats] = useState([])
  const dispatch = useDispatch()

  const handleSearch = (text) => {
    console.log('Searching:', text)
    // Filter from chats or send to backend
  }

  const chatListHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/chat/myChats`,
        {
          withCredentials: true,
        }
      )
      console.log('response', response)
      setChats(response.data.chats)
    } catch (error) {
      console.log('Error fetching chat list: ', error)
    }
  }

  useEffect(() => {
    chatListHandler()
  }, [])

  const getOtherUser = (chat, currentUserId) => {
    return chat.participants.find(p => p.id !== currentUserId)
  }

  const getUserSettings = (chat, currentUserId) => {
    return chat.settings.find(s => s.user === currentUserId)
  }

  return (
    <div className="w-full lg:w-[30%] h-full bg-[#2c2125] p-4 flex flex-col border-x border-white/5">
      {/* Search */}
      {!showSearch ? (
        <div
          className="bg-[#181818] p-3 w-fit rounded-md cursor-pointer"
          onClick={() => setShowSearch(true)}
        >
          <IoSearch className="text-white" />
        </div>
      ) : (
        <SearchBox onSearch={handleSearch} onClose={() => setShowSearch(false)} />
      )}

      {/* Chat list */}
      <div className="mt-4 flex flex-col items-center gap-y-[0.275rem] overflow-y-auto">
        {chats.map((chat) => {
          
          const otherUser = getOtherUser(chat, currentUserId)
          const settings = getUserSettings(chat, currentUserId)
          
          return (
          <div
            key={chat._id}
            className="bg-[#161717] min-h-[5.5rem] w-[98%] flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer shadow-md hover:w-[100%] transition-all duration-300 overflow-hidden"
            onClick={() => dispatch(setSelectedChat(chat))}
          >
            {/* Left side: Avatar + Info */}
            <div className="flex items-center w-[75%] overflow-hidden">
              <img
                src={otherUser.image || dp}
                alt="Profile"
                draggable="false"
                className="h-14 w-14 object-cover rounded-full bg-white shrink-0"
              />

              <div className="ml-4 flex flex-col justify-center items-start overflow-hidden">
                <h1 className="font-semibold text-lg tracking-wide text-white truncate max-w-full">
                  {otherUser.name || otherUser.userName}
                </h1>
                <p className="text-sm text-white/70 truncate max-w-full">
                  {chat.lastMessage?.content || 'No message yet'}
                </p>
              </div>
            </div>

            {/* Right side: time, mute, pin, count */}
            <div className="flex flex-col items-end gap-y-2 w-fit">
              {chat.updatedAt && (
                <p className="text-[#CA4F00] text-sm font-medium whitespace-nowrap">
                  {chat.updatedAt}
                </p>
              )}
              <div className="flex gap-x-1 items-center">
                {settings?.isMuted && <FaBellSlash className="w-5 h-5 text-[#004065]" />}
                {settings.isPinned && <RiPushpin2Fill className="w-5 h-5 text-[#004065]" />}
                {settings.unreadCount > 0 && (
                  <span className="p-1 font-medium bg-[#CA4F00] text-black rounded-full min-w-6 h-6 flex justify-center items-center text-xs">
                    {settings.unreadCount > 9 ? '9+' : settings.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default ChatList

// bg-[#0e6c0c]