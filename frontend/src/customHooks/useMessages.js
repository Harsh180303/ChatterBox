import React, { useEffect, useState } from 'react'
import { getMessages, sendMessageApi } from '../services/messageServices'
import getMediaType from '../utils/getMediaType'

// used to fetch messages form server
function useMessages( chatId , receiverUser ) {
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        if(!chatId) return

        setMessages([])
        setPage(1)
        setHasMore(true)
        fetchMessages(1)   

    }, [chatId])

    const fetchMessages = async (pageNo = 1) => {
        try {
            setLoading(true)
            const newMessages = await getMessages(chatId, pageNo)
            setMessages((prev) => [...prev, ...newMessages.reverse()]) //check if it is in correct order
            if(newMessages.length < 20) return setHasMore(false)
        } catch (error) {
            console.log("Fetching messages failed",error)
        } finally {
            setLoading(false)
        }
    }

    const sendMessage = async (text, file) => {
        try {
            const formData = new FormData()
            formData.append('content', text)
            if(file) {
                formData.append('media', file)
            }
            formData.append('messageType', file ? getMediaType(file) : 'text')

            const newMsg = await sendMessageApi(formData, receiverUser._id)
            setMessages((prev) => [...prev, newMsg]) // check this also (order)
        } catch (error) {
            console.log('Failed to send message', error)
        }
    }
    
  return {
    messages,
    loading,
    hasMore,
    fetchMessages,
    sendMessage,
  }
}

export default useMessages