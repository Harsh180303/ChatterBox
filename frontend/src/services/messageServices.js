import axios from 'axios'

export const getMessages = async (chatId, page = 1, limit = 20) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/message/get/${chatId}?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  )
  return response.data.messages
}

export const sendMessageApi = async (formData, receiverId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/message/send/${receiverId}`,
    formData,
    {
      withCredentials: true,
    }
  )

  return response.data.newMessage
}
