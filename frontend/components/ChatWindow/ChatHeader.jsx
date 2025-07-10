import { IoIosCall } from 'react-icons/io'
import { FaVideo } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearch, IoCloseSharp } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { clearSelectedChat } from '../../src/redux/chatSlice'
import dp from '../../src/assets/dp.png'
import { useDispatch } from 'react-redux'

const ChatHeader = ({receiverUser, }) => {
    const dispatch = useDispatch()
    
  return (
    <div className="h-20 w-full px-8 py-4 bg-[#161717] flex justify-between rounded-b-xl shadow-xl">
      {/* left sider message top */}
      <div className="h-full flex items-center gap-x-4">
        <IoIosArrowRoundBack
          className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform duration-150"
          onClick={() => dispatch(clearSelectedChat())}
        />

        <img
          src={receiverUser?.image || dp}
          alt="Profile picture"
          className="h-11 w-11 rounded-full cursor-pointer overflow-hidden bg-white"
        />

        <div className="flex flex-col items-start">
          <h1 className="font-bold text-xl tracking-wide">
            {receiverUser?.name || receiverUser?.userName}
          </h1>

          <p className="text-sm">
            {/* {selectedChat?.status || 'last seen a long time ago'} */}
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
  )
}

export default ChatHeader