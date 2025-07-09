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
      const settings = [sender, receiver].map((user) => ({
        user,
        isMuted: false,
        isPinned: false,
        isArchived: false,
        unreadCount: 0,
      }))
      chat = await Chat.create(
        [
          {
            participants: [sender, receiver],
            createdBy: sender,
            settings,
          },
        ],
        { session }
      )
      chat = chat[0]
    }

    // create the message
    const [ newMessage ] = await Message.create(
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

// to get all chat messages
export const getMessages = async(req, res, next) => {
    try {
        const userId = req.userId
        const chatId = req.params.chatId
        const chat = await Chat.findById( chatId )

        // validate if user is the part of the chat
        if(!chat || !chat.participants.map((id) => id.toString()).includes(userId.toString())) {
            return res.status(404).json({
                success: false,
                message: 'Chat not exist or access denied',
            })
        }

        // fetch messages ( Pagination )
        const limit = parseInt(req.query.limit) || 20
        const page = parseInt(req.query.page) || 1
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name userName _id')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean()

        return res.status(200).json({
            success: true,
            message: 'Got messages successfully',
            messages,
        })
        
    } catch (error) {
        console.log("getMessages Error: ", error)
        next({
            statusCode: 500,
            message: 'Failed to get messages',
            error: error.message
        })
    }
}