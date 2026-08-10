import express from 'express'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createNewConversation, getAllConversationSeller, updateLastMessage, getAllConversationUser } from '../controller/conversationController.js'

const conversationRouter = express.Router()

conversationRouter.post('/create-new-conversation', createNewConversation)
conversationRouter.get('/get-all-conversation-seller/:id', isSeller, getAllConversationSeller)
conversationRouter.get('/get-all-conversation-user/:id', getAllConversationUser)
conversationRouter.put('/update-last-message/:id', updateLastMessage)
export default conversationRouter