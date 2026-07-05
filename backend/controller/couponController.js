import express from 'express'
import { Shop } from "../models/shop.js";
import cloudinary from "../config/cloudinary.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Coupon from '../models/couponCode.js'

export async function createCouponCode(req, res) {
    try{
        const existingCoupons = await Coupon.find({name: req.body.name})
        if(existingCoupons.length !== 0){
            return res.status(404).json({success: false, message: 'Coupon code already exists!'})
        }
        const coupon = await Coupon.create(req.body)
        res.status(201).json({success: true, coupon})
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Internal Server Error!"})
    }
}

// get all coupons for a shop
export async function getAllCoupons(req, res) {
    try{
        const couponCodes = await Coupon.find({shopId: req.seller.id})
        res.status(201).json({
            success: true,
            couponCodes
        })
    } catch(error){
        console.error(error)
        res.status(500).json({success:false, message: "Internal server error"})
    }
}

export async function deleteCoupon(req, res){
    try {
        const couponId = await Coupon.findByIdAndDelete(req.params.id)
        if(!couponId){
            return res.status(404).json({
                success: false,
                message: "Coupon not found!"
            })
        }
        res.status(201).json({
            success: true,
            message: "Coupon delted successfully"
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export async function getCouponValue(req, res) {
    try{
        const couponCode = await Coupon.findONe({name: req.params.name})
        res.status(200).json({
            success: true,
            couponCode
        })
    } catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}