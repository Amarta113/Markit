import express from 'express'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createOrder, getAllOrders, getAllOrdersShop } from '../controller/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/create-order', createOrder)
orderRouter.get('/geta-all-orders/:userId', getAllOrders)
orderRouter.get('/get-seller-all-orders/:shopId', getAllOrdersShop)


export default orderRouter