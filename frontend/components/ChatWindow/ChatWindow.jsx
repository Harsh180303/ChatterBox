import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
// import dp from '../src/assets/dp.png'
import logo from '../../src/assets/logo.png'

import { BsCalendar2EventFill } from 'react-icons/bs'
import { FaPoll } from 'react-icons/fa'
import {
  FcOpenedFolder,
  FcPicture,
  FcVideoCall,
  FcMusic,
  FcContacts,
} from 'react-icons/fc'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SenderMessage from '../SenderMessage'
import ReceiverMessage from '../ReceiverMessage'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MediaPreview from './MediaPreview'

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

  const { _id: currentUserId } = useSelector(
    (state) => state.user.userData.user
  )
  console.log("current user's id: ", currentUserId)
  const { selectedChat } = useSelector((state) => state.chat)
  console.log(selectedChat)
  const [message, setMessage] = useState('')
  const [mediaFile, setMediaFile] = useState(null)

  const getMediaType = (file) => {
    const type = file.type
    if (type.startsWith('image/')) return 'image'
    if (type.startsWith('video/')) return 'video'
    if (type.startsWith('audio/')) return 'audio'
    return 'file'
  }

  const handleSendMessage = async () => {
    if (!message.trim() && !mediaFile) return

    const formData = new FormData()
    formData.append('content', message.trim())
    formData.append('messageType', mediaFile ? getMediaType(mediaFile) : 'text')
    if (mediaFile) {
      formData.append('media', mediaFile) // because backend mai media name se h
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/message/send/${receiverUser._id}`,
        formData,
        {
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          withCredentials: true,
        }
      )

      console.log('Message send: ', response)
      setMessage('')
      setMediaFile(null)
    } catch (error) {
      console.error('Error sending message: ', error)
    }
  }

  const receiverUser = selectedChat?.participants?.find(
    (p) => p._id !== currentUserId
  )

  return (
    <div className="hidden lg:flex w-full flex-1 h-full bg-[#2c2125]">
      {selectedChat ? (
        <div className="w-full relative h-full">
          <ChatHeader receiverUser={receiverUser} />

          {/* MESSAGE AREA */}
          <div className="h-full flex-1 overflow-y-auto space-y-3 pb-[10rem] px-4 pt-2">
            {/* <SenderMessage />
            <ReceiverMessage />
            <SenderMessage />
            <ReceiverMessage />
            <SenderMessage /> */}
          </div>

          {/* Bottom Most form */}
          <MessageInput
            attachments={attachments}
            message={message}
            setMessage={setMessage}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
            onSendMessage={handleSendMessage}
          />

          <MediaPreview />
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
