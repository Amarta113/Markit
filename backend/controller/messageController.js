import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../middleware/error";
import Messages from "../models/messages.js";

export const createNewMessage = catchAsyncError(async (req, res, next) => {
    try {
        const messageData = req.body
        if (req.files) {
            const files = req.files
            const imageUrls = files.map((file) => `${file.fileName}`)
            messageData.images = imageUrls
        }

        messageData.conversationId = req.body.conversationId
        messageData.senderId = req.body.senderId

        const message = new Messages({
            conversationId: messageData.conversationId,
            sender: messageData.sender,
            images: messageData.images ? messagesData.images : undefined
        })
        await message.save()

        res.status(201).json({
            success: true,
            message
        })
    } catch (error) {
        return next(new ErrorHandler(error.response.message), 500)
    }
})