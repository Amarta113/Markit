import express from 'express'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createNewConversation,getAllConversationSeller } from '../controller/conversationController.js'

const conversationRouter = express.Router()

conversationRouter.post('/create-new-conversation', createNewConversation)
conversationRouter.get('/get-all-conversation-seller/:id', isSeller, getAllConversationSeller)
export default conversationRouter