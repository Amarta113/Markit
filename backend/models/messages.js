import mongoose from 'mongoose'

const messageSchema =  mongoose.Schema(
    {
        conversationId: {
            type: String
        },
        sender: {
            type: Array
        },
        text: {
            type: String
        },
        images: [
        {
            type: String
        }]
    },
    {
        timestamps: true
    }
)

const Messages = mongoose.model("Messages", messageSchema)
export default Messages