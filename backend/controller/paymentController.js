import Stripe from 'stripe'
import ErrorHandler from '../middleware/error.js'

const getStripeInstance = () => {
    const apiKey =  process.env.STRIPE_API_KEY

    if (!apiKey) {
        throw new ErrorHandler(
            'Stripe secret key is missing. Add STRIPE_SECRET_KEY to your backend .env file.',
            500
        )
    }

    return new Stripe(apiKey)
}

export async function processStripePayment(req, res, next){
    try {
        const stripe = getStripeInstance()
        const myPayment = await stripe.paymentIntents.create({
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
        return next(error instanceof ErrorHandler ? error : new ErrorHandler(error.message || 'Stripe payment failed', 500))
    }
}

export async function getStripeApiKey(req, res, next){
    try {
        res.status(200).json({
            success: true,
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    } catch(error){
        return next(new ErrorHandler('Internal Server Error', 500))
    }
}