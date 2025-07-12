import React from 'react'

function SenderMessage({ msg }) {
  return (
    <div className='w-fit max-w-[25rem] xl:max-w-[25rem] 2xl:max-w-[30rem] h-fit flex flex-col text-start bg-[#CA4F00]/70 text-white  rounded-tr-none rounded-2xl px-5 py-2 relative right-0 ml-auto shadow-black shadow-md'>
        {msg.messageType === 'image' && msg.media?.url && (
          <img src={msg?.media?.url} alt='sent' className='w-full max-w-[16rem] rounded-md my-2'/>
        )}

        {msg.content && (
          <p>{msg.content}</p>
        )}
        
    </div>
  )
}

export default SenderMessage