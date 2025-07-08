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