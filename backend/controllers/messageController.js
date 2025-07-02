import mongoose from 'mongoose'
import uploadOnCloudinary from '../config/cloudinary.js'
import Chat from '../models/chatModel.js'
import Message from '../models/messageModel.js'

export const sendMessage = async (req, res, next) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const sender = req.userId
    const receiver = req.params.receiverId
    const { content, messageType } = req.body
    let media = null

    if (messageType === 'text' && !content) {
      return res.status(400).json({
        success: false,
        message: 'Text content is required for messageType text',
      })
    }

    // upload media if present (image, file, video)
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path)
      media = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      }
    }

    // check if already a chat exists between sender and receiver
    let chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [sender, receiver], $size: 2 },
    }).session(session)

    // if chat doesn't exist, create it
    if (!chat) {
      chat = await Chat.create(
        [
          {
            participants: [sender, receiver],
            createdBy: sender,
          },
        ],
        { session }
      )
      chat = chat[0]
    }

    // create the message
    const newMessage = await Message.create(
      [
        {
          sender,
          receiver,
          chat: chat._id,
          messageType,
          content,
          media,
        },
      ],
      { session }
    )

    // update the lastMessage is Chat
    chat.lastMessage = newMessage._id
    await chat.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      newMessage,
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()

    console.log('SendMessage Error: ', error)
    next({
      statusCode: 500,
      message: 'Failed to send message',
      error: error.message,
    })
  }
}
