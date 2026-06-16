import ErrorHandler from '../middleware/error.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import {Shop}  from '../models/shop.js'
import cloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail.js'
import {sendShopTokens} from '../config/sendTokens.js'

export const createShop = catchAsyncError(async(req, res, next) => {
    try{
        const { name, phoneNumber, address, zipCode, email, password } = req.body;
        const sellerEmail = await Shop.findOne({email})
        if(sellerEmail){
            if(req.file.filename){
                const public_id = req.file.filename.split(".")[0]
                await cloudinary.uploader.destroy(`ecommerce_uploads/${public_id}`)
            }
            return next(new ErrorHandler("User already exists", 400))
        }

        if(!req.file?.path || !req.file?.filename){
            return next(new ErrorHandler("Please upload an avatar!", 400))
        }

        const sellerData = {
            name,
            phoneNumber,
            email,
            password,
            address,
            zipCode,
            avatar: {
                public_id: req.file.filename.split(".")[0],
                url: req.file.path
            }
        }

        const activationTokens = createActivationTokens(sellerData)
        const activationURL = `http://localhost:5173/seller/activation/${activationTokens}`;
        await sendEmail({
                email: sellerData.email,
                subject: "Activate your account",
                message: generateEmailTemplate(activationURL, sellerData.name)
            })

        res.status(201).json({
                success: true,
                message: `Please check your email - ${sellerData.email} to activate your account!`
            })

    } catch(error){
        next(error)
    }
})

function createActivationTokens(seller) {
    return jwt.sign(seller, process.env.JWT_SECRET, {
        expiresIn: "10m"
    })
}

function generateEmailTemplate(activationURL, name) {
    return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Shop Verification</title>
            </head>
        <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:30px 0;">
                <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                    <tr>
                    <td style="background:#4f46e5; color:#ffffff; padding:20px; text-align:center; font-size:22px; font-weight:bold;">
                        Verify Your Shop
                    </td>
                    </tr>

                    <tr>
                    <td style="padding:25px; color:#333333; font-size:16px;">
                        <p>Hello ${name},</p>
                        <p>Thank you for registering. Please click on the link below to activate your shop:</p>
                        <p style="word-break:break-all; font-size:13px; color:#4f46e5;"> ${activationURL} </p>

                        <p>This link will expire in 10 minutes.</p>
                        <p>If you did not request this, please ignore this email.</p>

                        <p style="margin-top:30px;">Regards,<br><strong>Your App Team</strong></p>
                    </td>
                    </tr>
                    <tr>
                    <td style="background:#f9f9f9; padding:15px; text-align:center; font-size:12px; color:#888;">
                        © ${new Date().getFullYear()} Your App. All rights reserved.
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>
        `
}

export const activateSeller = catchAsyncError(async(req, res, next) => {
    try{
        const {url} = req.body
        const activation_token = req.body?.activation_token || req.body?.activationToken
        if(!activation_token){
            return next(new ErrorHandler("Activation token is required", 400))
        }
        if(!process.env.JWT_SECRET){
            return next(new ErrorHandler("Server configuration error", 500))
        }
        const seller = jwt.verify(activation_token, process.env.JWT_SECRET)
        if(!seller){
            return next(new ErrorHandler("Invalid seller token", 400))
        }
        const {name, email, password, avatar, zipCode, address, phoneNumber} = seller
        let existingSeller = await Shop.findOne({email})
        if(existingSeller){
            return next(new ErrorHandler("Seller already exists", 400))
        }
        const newSeller = await Shop.create({
            name,
            email,
            password,
            avatar,
            zipCode,
            address,
            phoneNumber
        })
        sendShopTokens(newSeller, 201, res)
    } catch(error){
        console.error("Activation error:", error)
        // Let error middleware handle JWT errors (JsonWebTokenError, TokenExpiredError)
        if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
            return next(error)
        }
        return next(new ErrorHandler(error?.message ?? "Activation failed", 500))
    }
})


export const loginSeller = catchAsyncError(async(req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return next(new ErrorHandler("Please provide email and password", 400))
        }

        const seller = await Shop.findOne({email}).select("+password")
        if(!seller){
            return next(new ErrorHandler("Invalid email or password, This seller doesn't exist!", 401 ))
        }
        
        const isPasswordMatched = await Shop.comparePassword(password)
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        sendShopTokens(user, 200, res)
    } catch(error){
        next(error)
    }
})

export const loadSeller = catchAsyncError(async(req, res, next) => {
    try{
        const seller = await Shop.findById(req.user.id)
        if(!seller){
            return next(new ErrorHandler("User not found", 404))
        }
        res.status(200).json({
            success: true,
            seller
        })
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

// log out user
export const logoutSeller = catchAsyncError(async(req, res, next) => {
    try{
        res.cookie("seller_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "None",
            secure: true
        })  
        res.status(201).json({
            success: true,
            message: "Logout successfully!"
        })     
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}) 