import React from 'react'
import { RxCross2 } from "react-icons/rx";

function MediaPreview({mediaFile, onClear}) {
  if(!mediaFile) return null

  const type = mediaFile.type
  const fileURL = URL.createObjectURL(mediaFile)
  
  return (
    <div className='absolute bottom-19 left-0 bg-[#161717] p-6 pt-2 rounded-md flex flex-col'>
      {console.log("MEdiaFile : ",mediaFile)}

      <button
        onClick={onClear}
        className='flex justify-end cursor-pointer'
      >
        <RxCross2 className=' hover:bg-red-600 w-fit'/>
      </button>

      {
        type.startsWith('image/') && (
          <img src={fileURL} alt='Preview'
            className='max-w-[13rem] flex justify-center rounded-md mt-1'
          />
        )
      }

      {
        type.startsWith('video/') && (
          <video controls src={fileURL}
            className='max-w-[13rem] flex justify-center rounded-md mt-1'
          />
        )
      }

      {
        type.startsWith('audio/') && (
          <audio controls src={fileURL}
            className='max-w-[13rem] flex justify-center rounded-md mt-1'
          />
        )
      }

      {
        !type.startsWith('image/') &&
        !type.startsWith('video/') &&
        !type.startsWith('audio/') && (
          <p className='text-white text-sm'>{mediaFile.name}</p>
        )
      }
      
    </div>
  )
}

export default MediaPreview