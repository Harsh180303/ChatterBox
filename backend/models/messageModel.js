import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,  
    },
    messageType: {
      type: String,
      enum: [
        'text',
        'image',
        'video',
        'audio',
        'file',
        'location',
        'contact',
        'call',
        'reply',
        'forward',
        'poll',
        'event',
      ],
      default: 'text',
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === 'text' // need to understand
      },
    },
    media: {
      url: String,
      public_id: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    forwardedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    previousContent: {
      type: String,
      default: null, // to show before edit version
    },
    scheduledFor: {
      type: Date,
    },
    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        emoji: String,
      },
    ],
  },
  { timestamps: true }
)

// 1. Get all messages in a chat (sorted by newest)
messageSchema.index({ chat: 1, createdAt: -1 })

// 2. For efficient reply threading
messageSchema.index({ replyTo: 1 })

// 3. For searching messages by sender (optional)
messageSchema.index({ sender: 1 })

// 4. For unread filtering (optional but useful)
messageSchema.index({ chat: 1, isRead: 1 })

// 5. For scheduled messages (optional, if you're using this feature)
messageSchema.index({ scheduledFor: 1 })

const Message = mongoose.model('Message', messageSchema)
export default Message
