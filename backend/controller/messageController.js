import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
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
        messageData.text = req.body.text

        const message = new Messages({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.senderId,
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

export const getAllMessages = catchAsyncError(async(req, res, next) => {
    try{
        const messages = await Messages.find({
            conversationId: req.params.id
        })

        res.status(201).json({
            success: true,
            messages
        })
    } catch(error){
        return next(new ErrorHandler(error.response.message), 500)   
    }
})