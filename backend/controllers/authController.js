import User from '../models/userModel.js'

export const signUp = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exist',
      })
    }

    const existingUsername = await User.findOne({ userName })
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'Username already exist, please try with different username',
      })
    }


  } catch (error) {
    console.log(error)
  }
}

export const logIn = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
  }
}

export const logOut = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
  }
}
