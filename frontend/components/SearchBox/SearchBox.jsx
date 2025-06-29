import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { IoSearch, IoCloseSharp } from 'react-icons/io5'
import useDebouncedInput from './useDebouncedInput'

const SearchBox = ({
  onSearch,
  placeholder = 'Search...',
  autoFocus = true,
  onClose,
}) => {
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const [value, setValue] = useState('')
  const debouncedValue = useDebouncedInput(value, 500)

//   Trigger search whenever debouncedValue changes
    useEffect(() => {
        if(debouncedValue.trim().length >= 2) {
          onSearch(debouncedValue.trim())
        } 
    }, [debouncedValue, onSearch])

  // Focus input on show
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])
  return (
    <form
      ref={wrapperRef}
      className="relative w-full flex items-center rounded-md gap-x-2 "
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="peer w-full pl-10 pr-4 py-2 rounded-md bg-[#181818] text-white focus:outline-none"
      />

      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#CA4F00] transition-colors">
        <IoSearch />
      </span>

      {value && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#CA4F00] cursor-pointer"
          onClick={() => {setValue(''), onClose?.()}}
        >
          <IoCloseSharp />
        </span>
      )}
    </form>
  )
}

export default SearchBox
