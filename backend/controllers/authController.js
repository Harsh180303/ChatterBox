import generateToken from '../config/token.js'
import User from '../models/userModel.js'
import crypto from 'node:crypto'
import sendEmail from '../utils/sendEmail.js'

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
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
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
      message: 'Sign Failed',
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
      user = await User.findOne({ email: identifier.toLowerCase() }).select(
        '+password'
      )
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
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
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
      message: 'Login Failed',
      error: error.message,
    })
  }
}

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Prevent OTP flooding
    if (user.resetPasswordExpire > Date.now()) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before requesting another OTP',
      })
    }

    const otp = crypto.randomInt(100000, 999999).toString()
    const hashedOTP = crypto.createHash("sha256").update(otp).digest('hex')

    user.resetPasswordOTP = hashedOTP,
    user.resetPasswordExpire = Date.now() + 1000 * 10 * 60
    await user.save({ validateBeforeSave: false })
    
    const response = await sendEmail({
      to: user.email,
      subject: '🔒 Reset Your Password - Action Required',
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="color: #333;">Hi ${user.userName || 'User'},</h2>
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Please use the OTP below to proceed:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <p style="font-size: 18px; color: #222;">Your One-Time Password (OTP):</p>
        <p style="font-size: 28px; font-weight: bold; background: #f1f1f1; padding: 12px 24px; display: inline-block; border-radius: 6px; color: #007BFF;">
          ${otp}
        </p>
      </div>
      <p style="font-size: 14px; color: #777;">
        This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email or contact support if you’re concerned.
      </p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 13px; color: #999;">
        Need help? Contact our support team.<br/>
        This is an automated message. Please do not reply.
      </p>
    </div> `,
    })

    if(!response.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      })
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent to your email',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to send email"
    })
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, otp} = req.body
    const user = await User.findOne({ email }).select("+resetPasswordOTP ")

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    if (!user.resetPasswordOTP || !user.resetPasswordExpire) {
      return res.status(400).json({
        success: false,
        message: 'OTP not requested or already used',
      })
    }


    if(Date.now() > user.resetPasswordExpire) {
      return res.status(400).json({
        success: false,
        message: 'Your OTP has been expired'
      })
    }

    const enteredOTP = crypto.createHash('sha256').update(otp).digest('hex')
    if(enteredOTP !== user.resetPasswordOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.password = newPassword
    user.resetPasswordExpire = null
    user.resetPasswordOTP = null
    await user.save()

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    })
    
  } catch (error) {
    console.log(error)
    next({
      statusCode: 500,
      message: 'Failed to reset password'
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
      message: 'Logged out successfully',
    })
  } catch (error) {
    next({
      statusCode: 500,
      message: 'Logout Failed',
      error: error.message,
    })
  }
}
// select("-_id") bcoz response mai userid ja rhi hai jiska koi use h ni
