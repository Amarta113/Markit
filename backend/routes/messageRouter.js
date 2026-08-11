import express from "express";
import upload from "../multer.js";
import {createNewMessage, getAllMessages} from '../controller/messageController.js'

const messageRouter = express.Router()
messageRouter.post('/create-new-message', upload.array('images'), createNewMessage)
messageRouter.get('/get-all-messages/:id', getAllMessages)

export default messageRouter