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

export const getAllConversationSeller = catchAsyncError(async(req, res, next) => {
    try{
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.id]
            }
        }).sort({updatedAt: -1, createdAt: -1})
    
    res.status(201).json({
        success: true,
        conversations
    })

    }catch(error){
        return next(new ErrorHandler(error.response.message), 500)
    }
})
