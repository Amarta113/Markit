import express from "express";
import upload from "../multer";
import {createNewMessage} from '../controller/messageController'

const messageRouter = express.Router()
messageRouter.post('/create-new-message', upload.array('images'), createNewMessage)

export default messageRouter