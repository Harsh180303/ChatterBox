import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      minLength: [3, 'Name should be at least 3 characters long'],
      trim: true,
    },
    about: {
      type: String,
      maxLength: [30, 'About should not exceed 30 characters'],
      trim: true,
      default: 'Just getting started 💡',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'],
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9_.]+$/, 'Invalid username format'],
      minLength: [3, 'Username should be at least 3 characters long'],
      maxLength: [20, 'Username should not exceed 20 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password must be at least 6 characters long'],
      select: false, // Don't return password by default in queries
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    resetPasswordOTP: {
      type: String,
      default: null,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
    lastSeen: {
      type: Date,
    },
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    contacts: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every((num) => /^[0-9]{10}$/.test(num))
        },
        message: 'Each contact number must be exactly 10 digits',
      },
      default: [],
    },
    starredMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        // message content kaha store hoga?
      },
    ],
  },
  {
    // strict: 'throw',
    timestamps: true,
  }
)

// userSchema.index({ userName: 1})
// userSchema.index({ email: 1 })

userSchema.pre('save', async function (next) {
  // in case of username update no need to hash password
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
