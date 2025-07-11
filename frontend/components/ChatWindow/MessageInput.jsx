import { IoMdSend } from 'react-icons/io'
import { MdMic } from 'react-icons/md'
import { RiEmojiStickerFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'
import MediaPreview from './MediaPreview'

const MessageInput = ({
  attachments,
  message,
  setMessage,
  mediaFile,
  setMediaFile,
  onSendMessage,
}) => {
  const attachmentsIconRef = useRef(null)
  const emojiRef = useRef(null)
  const emojiIconRef = useRef(null)
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const audioInputRef = useRef(null)
  const documentInputRef = useRef(null)
  const attachmentsRef = useRef(null)
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachmentsRef.current &&
        !attachmentsRef.current.contains(event.target) &&
        attachmentsIconRef.current &&
        !attachmentsIconRef.current.contains(event.target)
      ) {
        setIsAttachmentOpen(false)
      }
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        emojiIconRef.current &&
        !emojiIconRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMediaSelect = (e) => {
    // console.log(e)
    const file = e.target.files[0]
    console.log(file)
    if (!file) return

    setMediaFile(file) //ready to send
    // e.target.value = '' // clear input
  }

  const handleAttachmentClick = (type) => {
    if (type === 'image') {
      imageInputRef.current.click() // opens file picker
    } else if (type === 'video') {
      videoInputRef.current.click()
    } else if (type === 'audio') {
      audioInputRef.current.click()
    } else {
      const docType = [
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.ppt',
        '.pptx',
        '.txt',
      ]
      if (docType.includes(type)) {
        documentInputRef.current.click()
      }
    }

    // to be add other types here
  }

  return (
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
            onClick={(e) => {
              e.stopPropagation();
              setIsAttachmentOpen((prev) => !prev)
            }}
          >
            <FaPlus className="text-white" />
          </div>

          {isAttachmentOpen && (
            <div
              ref={attachmentsRef}
              className="absolute bottom-18 left-0 max-w-[22rem] bg-[#2f2f2f] px-2 py-2 rounded-md shadow-xl z-10"
            >
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-2 gap-y-2">
                {attachments.map((item, index) => (
                  <div
                    onClick={() => handleAttachmentClick(item.type)}
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
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojiPicker((prev) => !prev)
            }}
          >
            <RiEmojiStickerFill className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
          </div>

          {showEmojiPicker && (
            <div
              ref={emojiRef}
              className="absolute bottom-18 left-0 z-50"
            >
              <EmojiPicker
                onEmojiClick={(emojiData) =>
                  setMessage((prev) => prev + emojiData.emoji)
                }
                theme="auto"
                emojiStyle="native"
                lazyLoadEmojis="true"
                width={450}
                height={350}
                className="shadow-lg"
              />
            </div>
          )}
        </div>

        {/* IMAGE INPUT */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleMediaSelect}
        />

        {/* VIDEO INPUT */}
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={handleMediaSelect}
        />

        {/* AUDIO INPUT */}
        <input
          ref={audioInputRef}
          type="file"
          accept="audio/*"
          hidden
          onChange={handleMediaSelect}
        />

        {/* DOCUMENT INPUT */}
        <input
          ref={documentInputRef}
          type="file"
          // accept='*/*'
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
          hidden
          onChange={handleMediaSelect}
        />

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
          {( message === '' && !mediaFile ) ? (
            <MdMic className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]" />
          ) : (
            <IoMdSend
              onClick={onSendMessage}
              className="h-6 w-6 cursor-pointer hover:text-[#CA4F00]"
            />
          )}
        </div>
      </form>

      {mediaFile && <MediaPreview />}
    </div>
  )
}

export default MessageInput
