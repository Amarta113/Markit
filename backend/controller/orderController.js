import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Order from '../models/order.js';

export const createOrder = catchAsyncError(async(req, res, next) => {
    try{
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body
        const shopItemsMap = new Map()

        for(const item of cart){
            const shopId = item.shopId;
            if(!shopItemsMap.has(shopId)){
                shopItemsMap.set(shopId, [])
            }
            shopItemsMap.get(shopId).push(item)
        }

        // create an order for each shop
        const orders = []
        for (const [shopId, items] of shopItemsMap){
            const order = await Order.create(
                {
                    cart: items,
                    shippingAddress,
                    user,
                    totalPrice,
                    paymentInfo
                })
                orders.push(order)
        }
        res.status(201).json({
            success: true,
            orders
        })

    }catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getAllOrders = catchAsyncError(async(req, res, next) => {
    try{
        const orders = (
            await Order.find({"user._id": req.params.userId})).toSorted({
            createdAt: -1
        })
        res.status(200).json({
            success: true,
            orders
        })
    }catch{
        return next(new ErrorHandler(error.message, 500))
    }
})

export const getAllOrdersShop = catchAsyncError( async(req, res, next) => {
    try{
        const orders = (
            await Order.find({"cart.shopId": req.params.shopId})).toSorted({
            createdAt: -1
        })
        res.status(200).json({
            success: true,
            orders
        })
    }catch{
        return next(new ErrorHandler(error.message, 500))
    }
})