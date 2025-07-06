import React from 'react'
import SideBar from '../../components/SideBar'
import ChatList from '../../components/ChatList'
import ChatWindow from '../../components/ChatWindow'

function Home() {
  return (
    <div className='flex h-screen w-screen text-white text-center overflow-hidden'>
      <div className='xl:w-[5%] 2xl:w-[4%] w-[4%]'>
        <SideBar/>
      </div>
      <ChatList />
      <ChatWindow />
    </div>
  )
}

export default Home