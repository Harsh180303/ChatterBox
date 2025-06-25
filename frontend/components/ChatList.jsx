import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import SearchBox from './SearchBox'

const ChatList = () => {
    const [showSearch, setShowSearch] = useState(false)

    const handleSearch = (text) => {
        console.log('Searching:', text)
        // Filter from chats or send to backend
    }
    
    return (
        <div className="w-full lg:w-[30%] h-full bg-[#2c2125] p-4 flex flex-col border-x border-white/5">
            {!showSearch ? (
            <div
                className="bg-[#181818] p-3 w-fit rounded-md cursor-pointer"
                onClick={() => setShowSearch(true)}
                >
                <IoSearch />
            </div>
            ) : (
                <SearchBox onSearch={handleSearch} onClose={() => setShowSearch(false)} />
            )}
        </div>
    )
}

export default ChatList
