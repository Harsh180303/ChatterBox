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
      ref: 'Chat', // chatModel
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
      ],
      default: 'text',
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === 'text'
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
