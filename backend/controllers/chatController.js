import Chat from "../models/chatModel.js"

export const getMyChats = async (req, res, next) => {
    try {
        const userId = req.userId
        
        const limit = parseInt(req.query.limit) || 20
        const page = parseInt(req.query.page) || 1

        const chats = await Chat.find({
            participants: userId
        })
        .populate('participants', 'name userName image')
        .populate({
            path: 'lastMessage',
            populate: {
                path: 'sender',
                select: 'name userName image'  // kisne last message kiya h
            }
        })
        .sort({ updatedAt: -1})
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

        return res.status(200).json({
            success: true,
            message: 'Got the chats successfully',
            chats,
        })
    } catch (error) {
        console.log("getMyChats error:", error);
        next({
            statusCode: 500,
            message: 'Failed to get chats',
            error: error.message
        })
    }
}


export const accessChat = async(req, res, next) => {
    try {
        const sender = req.userId
        const receiver = req.params.userId

        if(!receiver) {
            return res.status(400).json({
                success: false,
                message: "Receiver is required"
            })
        }

        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [sender, receiver], $size: 2}
        })
        .populate('participants', 'name userName image')

        if(!chat) {
            const createdChat = await Chat.create({
                participants: [sender, receiver],
                createdBy: sender,
            })
        }

        // populate after creation
        chat = await Chat.findById(createdChat._id)
        .populate('participants', 'name userName image')

        return res.status(200).json({
            success: true,
            message: 'Chat created successfully',
            chat,
        })
        
    } catch (error) {
        console.log('Error while accessing chat', error)
        next({
            statusCode: 500,
            message: 'Failed to access chat',
            error: error.message
        })
    }
}