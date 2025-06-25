import React from 'react'
import SideBar from '../../components/SideBar'
import ChatList from '../../components/ChatList'
import ChatWindow from '../../components/ChatWindow'

function Home() {
  return (
    <div className='flex h-screen w-screen text-white text-center'>
      <SideBar/>
      <ChatList />
      <ChatWindow />
    </div>
  )
}

export default Home