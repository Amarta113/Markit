import express from 'express'
import { Shop } from "../models/shop.js";
import cloudinary from "../config/cloudinary.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import couponCode from '../models/couponCode.js'

export async function createCouponCode(req, res) {
    try{
        const isCouponCode = await couponCode.find({name: req.body.name})
        if(isCouponCode.length !== 0){
            return res.status(404).json({success: false, message: 'Coupon code already exists!'})
        }
        const couponCode = await couponCode.create(req.body)
        res.status(201).json({success: true, couponCode})
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Internal Server Error!"})
    }
}

export async function getAllCoupons(req, res) {
    try{

    } catch(error){
        console.error(error)
        res.status(500).json({success:false, message: "Internal server error"})
    }
}

export async function deleteCoupon(req, res){

}

export async function getCouponValue(req, res) {
    
}