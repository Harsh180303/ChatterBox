import User from "../models/userModel.js"

export const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.userId
        const user = await User.findById({_id: userId})

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Current user found",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message} || "Unable to find current user" `
        })
    }
}
