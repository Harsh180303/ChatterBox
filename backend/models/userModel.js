import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: {
        type: String,
        // required: true,
        minLength: [3, "Name should be at least 3 characters long"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Username should be at least 3 characters long"],
        maxLength: [20, "Username should not exceed 20 characters"]
    },
    image: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false  // Don't return password by default in queries
    },
}, {
    timestamps: true,
})

userSchema.pre('save', async function (next) {
    // in case of username update no need to hash password
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User