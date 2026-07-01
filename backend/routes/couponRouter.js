import express from 'express'
import upload from '../multer.js'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import {createCouponCode, getAllCoupons, getCouponValue, deleteCoupon} from '../controller/couponController.js'
const couponCodeRouter = express.Router()

couponCodeRouter.post('/create-coupon-code', createCouponCode)
couponCodeRouter.get('/get-coupon/:id', isSeller, getAllCoupons)
couponCodeRouter.get('/get-coupon-value/:name', getCouponValue)
couponCodeRouter.delete('/delete-coupon/:id', isSeller, deletCoupon)

export default eventsRouter