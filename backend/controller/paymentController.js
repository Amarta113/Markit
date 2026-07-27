import Stripe from 'stripe'
import { catchAsyncError } from '../middleware/catchAsyncError.js'

const stripe = new Stripe(process.env.STRIPE_API_KEY)

export async function processStripePayment(req, res, next){
    try {
        const myPayment = await stripe?.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            metadata: {
                company: 'DW Enterprise'
            }
        })
        res.status(201).json({
            success:true,
            client_secret: myPayment.client_secret
        })
    } catch(error){
        return next(new ErrorHandler(error, 500))
    }
}

export async function getStripeApiKey(req, res, next){
    try {
        res.status(200).json({
            success: true,
            stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
        })
    } catch(error){
        return next(new ErrorHandler("Internal Server Error", 500))
    }
}