import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },

    // Members in the chat (2 users for private, multiple for group)
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    maxParticipants: {
        type: Number,
        default: 256,
    },

    // Group chat details (optional for one-to-one)
    name: {
      type: String,
      trim: true,
    },
    groupAdmins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Last message reference
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },

    // Per-user settings (mute, pin, archived)
    settings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isMuted: { type: Boolean, default: false },
        isPinned: { type: Boolean, default: false },
        isArchived: { type: Boolean, default: false },
        unreadCount: { type: Number, default: 0 },
      },
    ],

    //   Group image
    groupImage: {
      type: String,
      default: '',
    },
    // used for soft deletion
    isDeleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      maxLength: 200,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    leftUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    inviteLink: {
      type: String,
      unique: true,
      sparse: true
    },
  },
  { timestamps: true }
)

// To fetch all chats of a user
chatSchema.index({ participants: 1 })

// For chat listing sorted by latest messages
chatSchema.index({ participants: 1, lastMessage: -1 })

// To support direct access by invite link
chatSchema.index({ inviteLink: 1 }, { unique: true, sparse: true })

// To filter group chats vs personal chats
chatSchema.index({ isGroupChat: 1 })

// To fetch all chats created by a user (admin feature)
chatSchema.index({ createdBy: 1 })