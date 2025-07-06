import React from 'react'
import dp from '../src/assets/dp.png'

function SenderMessage() {
  return (
    <div className='w-fit max-w-[25rem] xl:max-w-[25rem] 2xl:max-w-[30rem] h-fit flex flex-col text-start bg-[#CA4F00]/70 text-white  rounded-tr-none rounded-2xl px-5 py-2 relative right-0 ml-auto shadow-black shadow-md'>
        {/* <h1>Sender Message is to check the word limit of this box is  acturally the fgive exqula o tor not</h1> */}
        <img src={dp} width={150} className='rounded-lg'/>
        <h1>Sender Message is to check the word limit of this box is  acturally the fgive exqula o tor not</h1>

    </div>
  )
}

export default SenderMessage