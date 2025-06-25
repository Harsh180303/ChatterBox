import User from '../models/userModel.js'
import uploadOnCloudinary from '../config/cloudinary.js'

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId
    const user = await User.findById({ _id: userId })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Current user found',
      user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${error.message} || "Unable to find current user" `,
    })
  }
}


export const editProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body
    let image
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path)

      if (!image) {
        return res
          .status(500)
          .json({ success: false, message: 'Image upload failed, Try again.' })
      }
    }

    const updateData = {}
    if (name) updateData.name = name
    if (about) updateData.about = about
    if (image) updateData.image = image

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    )

    if(!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
    }

    return res
      .status(200)
      .json({ success: false, message: 'Profile updated successfully', user })
  } catch (error) {
    next({
        statusCode: 500,
        message: "Failed to update profile",
        error: error.message
    })
  }
}

export const getOtherUsers = async(req, res, next) => {
    try {
        let users = await User.find({
            _id:{$ne: req.userId}
        }).select("-password")
    } catch (error) {
        console.log(error)
        next({
            statusCode: 500,
            message: 'Failed to get other users',
            error: error.message
        })
    }
}