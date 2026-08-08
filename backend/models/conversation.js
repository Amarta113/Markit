import mongoose from 'mongoose'

const conversationSchema =  mongoose.Schema(
    {
        groupTitle: {
            type: String
        },
        members: {
            type: Array
        },
        lastMessage: {
            type: String
        },
        lastMessageId: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Messages = mongoose.model("Messages", conversationSchema)
export default Messages