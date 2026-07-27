import express from 'express'
import { catchAsyncError } from '../middleware/catchAsyncError'
import { processStripePayment } from '../controller/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post("/payment/process", processStripePayment)
paymentRouter.get("/stripeapikey", getStripeApiKey)

export default paymentRouter;