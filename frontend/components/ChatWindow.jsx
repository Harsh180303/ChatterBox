import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../src/assets/dp.png'
import logo from '../src/assets/logo.png'
import { IoIosCall } from 'react-icons/io'
import { FaVideo } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearch, IoCloseSharp } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { clearSelectedChat } from '../src/redux/chatSlice'
import { IoMdSend } from 'react-icons/io'
import { RiEmojiStickerFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa6'
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaPoll } from "react-icons/fa";
import {
  FcDocument,
  FcOpenedFolder,
  FcEditImage,
  FcPicture,
  FcVideoCall,
  FcAudioFile,
  FcMusic,
  FcContacts,
} from 'react-icons/fc'
import { FaMapMarkerAlt } from 'react-icons/fa'

function ChatWindow() {
  const attachments = [
    { label: 'Document', type: 'file', image: <FcOpenedFolder /> },
    { label: 'Image', type: 'image', image: <FcPicture /> },
    { label: 'Video', type: 'video', image: <FcVideoCall /> },
    { label: 'Audio', type: 'audio', image: <FcMusic /> },
    { label: 'Location', type: 'location', image: <FaMapMarkerAlt className='text-[#CA4F00]'/> },
    { label: 'Contact', type: 'contact', image: <FcContacts /> },
    { label: 'Event', type: 'date', image: <BsCalendar2EventFill className='text-[#10545d]'/> },
    { label: 'Poll', type: 'poll', image: <FaPoll className='text-[#204d96]'/> },
  ]

  const { selectedChat } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  console.log(selectedChat)
  const [message, setMessage] = useState('')

  const handleAttachmentToggle = async () => {
    setIsAttachmentOpen((prev) => !prev)
  }

  return (
    <div className="hidden lg:flex w-full flex-1 h-full bg-[#2c2125]">
      {selectedChat ? (
        <div className="w-full relative h-full">
          <div className="h-20 w-full px-8 py-4 bg-[#161717] flex justify-between rounded-b-xl shadow-xl">
            {/* left sider message top */}
            <div className="h-full flex items-center gap-x-4">
              <IoIosArrowRoundBack
                className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform duration-150"
                onClick={() => dispatch(clearSelectedChat())}
              />

              <img
                src={selectedChat?.image || dp}
                alt="Profile picture"
                className="h-11 w-11 rounded-full cursor-pointer overflow-hidden bg-white"
              />

              <div className="flex flex-col items-start">
                <h1 className="font-bold text-xl tracking-wide">
                  {selectedChat?.name || selectedChat?.userName}
                </h1>

                <p className="text-sm">
                  {selectedChat?.status || 'last seen a long time ago'}
                </p>
              </div>
            </div>

            {/* right sider message top */}
            <div className=" flex items-center gap-x-4">
              <IoIosCall className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
              <FaVideo className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
              <IoSearch className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
              <BsThreeDotsVertical className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
            </div>
          </div>

          {/* Bottom Most form */}
          <div className="absolute bottom-1 shadow-2xl w-[99%] inset-x-0 mx-auto bg-[#161717] h-18 flex items-center px-8 py-4 rounded-lg ">
            <form className="flex gap-x-4 justify-between w-full">
              {/* ATTACHMENTS & EMOJIS */}
              <div className="flex gap-x-3 items-center">
                {/* attachments */}
                <div
                  className={`p-2 bg-[#2f2f2f] rounded-full cursor-pointer transition-transform duration-300 ${
                    isAttachmentOpen ? 'rotate-[225deg]' : 'rotate-0'
                  }`}
                  onClick={handleAttachmentToggle}
                >
                  <FaPlus className="text-white" />
                </div>
                {isAttachmentOpen && (
                  <div className="absolute bottom-[5rem] left-0 max-w-[22rem] bg-[#2f2f2f] px-2 py-2 rounded-md shadow-xl z-10">
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-2 gap-y-2">
                      {attachments.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center bg-[#161717] p-3 rounded-md min-w-[4.5rem] h-[5rem] cursor-pointer hover:bg-[#1e1e1e] transition-all"
                        >
                          <i className="text-2xl">{item.image}</i>
                          <p className="text-xs mt-1 text-center select-none">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* emoji */}
                <RiEmojiStickerFill className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
              </div>

              {/* INPUT BOX */}
              <div className='flex items-center gap-x-3 w-full'>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  rows={1}
                  maxLength={2000}
                  className="resize-none w-full max-h-[10rem] min-h-[2.5rem] outline-none rounded-md overflow-y-auto px-3 py-[0.6rem] bg-transparent text-white placeholder:text-gray-400 leading-tight"
                  placeholder="Type a message"
                />

                {/* SEND BUTTON */}
                <IoMdSend className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="relative flex w-full h-full justify-center items-center text-balance flex-col gap-y-1">
          <img
            src={logo}
            alt="logo"
            draggable="false"
            className="w-[18rem] absolute bottom-1/2 hover:scale-105 transition-all duration-500"
          />
          <p className="text-5xl font-bold">Welcome to ChatterBox</p>
          <p className="text-2xl">Select any chat to view content</p>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
