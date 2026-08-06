import express from 'express'
import { getStripeApiKey, processStripePayment } from '../controller/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post("/process", processStripePayment)
paymentRouter.get("/stripeapikey", getStripeApiKey)

export default paymentRouter;