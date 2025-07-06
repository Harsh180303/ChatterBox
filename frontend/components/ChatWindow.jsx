import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
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
import { MdMic } from 'react-icons/md'
import { RiEmojiStickerFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa6'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { FaPoll } from 'react-icons/fa'
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
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';

function ChatWindow() {
  const attachments = [
    { label: 'Document', type: 'file', image: <FcOpenedFolder /> },
    { label: 'Image', type: 'image', image: <FcPicture /> },
    { label: 'Video', type: 'video', image: <FcVideoCall /> },
    { label: 'Audio', type: 'audio', image: <FcMusic /> },
    {
      label: 'Location',
      type: 'location',
      image: <FaMapMarkerAlt className="text-[#CA4F00]" />,
    },
    { label: 'Contact', type: 'contact', image: <FcContacts /> },
    {
      label: 'Event',
      type: 'date',
      image: <BsCalendar2EventFill className="text-[#10545d]" />,
    },
    {
      label: 'Poll',
      type: 'poll',
      image: <FaPoll className="text-[#204d96]" />,
    },
  ]

  const emojiRef = useRef(null)
  const emojiIconRef = useRef(null)
  const attachmentsRef = useRef(null)
  const attachmentsIconRef = useRef(null)
  const { selectedChat } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  console.log(selectedChat)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(attachmentsRef.current && !attachmentsRef.current.contains(event.target) &&
        attachmentsIconRef.current && !attachmentsIconRef.current.contains(event.target)
      ) {
        setIsAttachmentOpen(false)
      }
      if(emojiRef.current && !emojiRef.current.contains(event.target) &&
        emojiIconRef.current && !emojiIconRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

          {/* MESSAGE AREA */}
          <div className="h-full flex-1 overflow-y-auto pb-[10rem] px-4 pt-2">
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
          </div>

          {/* Bottom Most form */}
          <div className="absolute bottom-0 shadow-2xl w-[99%] inset-x-0 mx-auto bg-[#161717] h-18 flex items-center px-8 py-4 rounded-lg ">
            <form className="flex gap-x-4 justify-between w-full">
              {/* ATTACHMENTS & EMOJIS */}
              <div className="flex gap-x-3 items-center">
                {/* attachments */}
                <div
                  ref={attachmentsIconRef}
                  className={`p-2 bg-[#2f2f2f] rounded-full cursor-pointer transition-transform duration-300 ${
                    isAttachmentOpen ? 'rotate-[225deg]' : 'rotate-0'
                  }`}
                  onClick={(e) => {e.stopPropagation(), setIsAttachmentOpen((prev) => !prev)}}
                >
                  <FaPlus className="text-white" />
                </div>
                {isAttachmentOpen && (
                  <div
                    ref={attachmentsRef}
                     className="absolute bottom-18 left-0 max-w-[22rem] bg-[#2f2f2f] px-2 py-2 rounded-md shadow-xl z-10">
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
                <div 
                  ref={emojiIconRef}
                  onClick={(e) => {e.stopPropagation(), setShowEmojiPicker(prev => !prev)}}
                >
                <RiEmojiStickerFill className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
                </div>

                {showEmojiPicker && (
                  <div 
                    ref={emojiRef}
                    className='absolute bottom-18 left-0 z-50' >
                    <EmojiPicker 
                      onEmojiClick={(emojiData) => setMessage(prev => prev + emojiData.emoji )}
                      theme='auto'
                      emojiStyle='native'
                      lazyLoadEmojis="true"
                      width={450}
                      height={350}
                      className='shadow-lg'
                    />
                  </div>
                )}
              </div>

              {/* INPUT BOX */}
              <div className="flex items-center gap-x-3 w-full">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  rows={1}
                  maxLength={2000}
                  className="resize-none w-full max-h-[10rem] min-h-[2.5rem] outline-none rounded-md overflow-y-auto px-3 py-[0.6rem] bg-transparent text-white placeholder:text-gray-400 leading-tight"
                  placeholder="Type a message"
                />

                {/* AUDIO / MESSAGE SEND BUTTON */}
                {message === '' ? (
                  <MdMic className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
                ) : (
                  <IoMdSend className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
                )}
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
