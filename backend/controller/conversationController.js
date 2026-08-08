import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../middleware/error";
import Conversation from "../models/conversation.js";

export const createNewConversation = catchAsyncError(async (req, res, next) => {
    try {
        const { groupTitle, userId, sellerId } = req.body
        const isConversationExist = await Conversation.findOn({ groupTitle })

        if (isConversationExist) {
            const conversation = isConversationExist
            res.status(201).json({
                success: true,
                conversation
            })
        } else {
            const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle: groupTitle
            })
            res.status(201).json({
                success: true,
                conversation
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error.response.message, 500))
    }
})


