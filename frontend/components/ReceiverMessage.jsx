import React from 'react'
import dp from '../src/assets/dp.png'

function ReceiverMessage({ msg }) {
  return (
      <div className='w-fit max-w-[25rem] xl:max-w-[25rem] 2xl:max-w-[30rem] h-fit flex flex-col text-start bg-[#242626] text-white rounded-tl-none rounded-2xl px-5 py-2 relative left-0 mr-auto shadow-black shadow-md'>
        {console.log('MESSAGE: ', msg)}
        {/* {msg.msg.messageType === 'image' ? <img src='' /> : } */}
        {/* <p>{msg.msg.content}</p> */}
      </div>
    )
}

export default ReceiverMessage