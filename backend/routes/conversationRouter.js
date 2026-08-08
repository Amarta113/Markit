import express from 'express'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createNewConversation } from '../controller/conversationController.js'

const conversationRouter = express.Router()

conversationRouter.post('/create-new-conversation', createNewConversation)
export default conversationRouter