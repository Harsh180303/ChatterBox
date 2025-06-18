import generateToken from '../config/token.js'
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

    const user = await User.create({
      userName,
      email,
      password,
    })

    const token = generateToken(user._id)

    if (!token) {
      return res.status(500).json({
        success: false,
        message: 'Token generation failed',
      })
    }

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    })
  } catch (error) {
    next({
        statusCode: 500,
        message: "Sign Failed",
        error: error.message,
    })
  }
}

export const logIn = async (req, res, next) => {
  try {
    const { identifier, password } = req.body
    let user

    if (identifier.includes('@')) {
      // Must be email
      user = await User.findOne({ email: identifier.toLowerCase() }).select('+password')
    } else {
      // Must be userName
      user = await User.findOne({ userName: identifier }).select('+password')
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const isMatched = await user.comparePassword(password)
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // generate token in cookies
    const token = generateToken(user._id)

    if (!token) {
      return res.status(500).json({
        success: false,
        message: 'Token generation failed',
      })
    }

    res.cookie('token', token, {
      maxAge: 1000 * 3 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    next({
        statusCode: 500,
        message: "Login Failed",
        error: error.message,
    })
  }
}

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    })
  } catch (error) {
    next({
        statusCode: 500,
        message: "Logout Failed",
        error: error.message
    })
  }
}
// select("-_id") bcoz response mai userid ja rhi hai jiska koi use h ni