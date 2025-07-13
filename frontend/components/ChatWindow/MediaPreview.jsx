import React from 'react'
import { RxCross2 } from "react-icons/rx";

function MediaPreview({mediaFile, onClear}) {
  if(!mediaFile) return null

  const type = mediaFile.type
  const fileURL = URL.createObjectURL(mediaFile)
  
  return (
    <div className='absolute bottom-19 left-0 bg-[#161717] w-[17rem]'>
      {console.log("MEdiaFile : ",mediaFile)}

      <button
        onClick={onClear}
      >
        <RxCross2 />
      </button>

      {
        type.startsWith('image/') && (
          <img src={fileURL} alt='Preview'
            className='max-w-[13rem] flex justify-center rounded-md'
          />
        )
      }
    </div>
  )
}

export default MediaPreview