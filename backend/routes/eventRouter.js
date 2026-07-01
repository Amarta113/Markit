import express from 'express'
import upload from '../multer.js'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createEvent, deleteEvents, getAllEvents, getAllEventsShop } from '../controller/eventController.js'

const eventsRouter = express.Router()

eventsRouter.post('/create-event', upload.array("images"), createEvent)
eventsRouter.get('/get-all-events-shop/:id', getAllEventsShop)
eventsRouter.delete('/delete-shop-events/:id', isSeller, deleteEvents)
eventsRouter.get('/get-all-events', getAllEvents)
export default eventsRouter