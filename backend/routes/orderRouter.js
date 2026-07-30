import express from 'express'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createOrder, getAllOrders } from '../controller/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/create-order', createOrder)
orderRouter.get('/geta-all-orders/:userId', getAllOrders)


export default orderRouter