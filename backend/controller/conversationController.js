import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../middleware/error";
import Messages from "../models/conversation";

export const createNewConversation = catchAsyncError(async(req, res, next) => {
        try{
            const {groupTitle, userId, sellerId} = req.body
            const isConversationExist = await Messages.findOn({groupTitle})

            if(!isConversationExist){
                return next(new ErrorHandler("Conversation group already exists with this seller"), 500)
            }

            const conversation = await Messages.create({
                members: [userId, sellerId],
                groupTitle: groupTitle
            })

            res.status(201).json({
                success: true,
                conversation
            })
        }catch(error){
            return next(new ErrorHandler(error.response.message, 500))
        }
})
