import ErrorHandler from '../middleware/error.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import { User } from '../models/userModel.js'
import cloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../utils/sendEmail.js'
import {sendTokens} from '../config/sendTokens.js'

export const register = catchAsyncError(async(req, res, next) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return next(new ErrorHandler("All fields are required", 400))
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            // cleanup image if email already exists
            if(req.file?.filename){
                const publicId = req.file.filename.split(".")[0]
                await cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`)
            }
            return next(new ErrorHandler("Email is already used.", 400))
        }

        if(!req.file?.path || !req.file?.filename){
            return next(new ErrorHandler("Please upload an avatar!", 400))
        }

        const userData = {
            name,
            email,
            password,
            accountVerified: false,
            avatar: {
                public_id: req.file.filename.split(".")[0],
                url: req.file.path
            }
        }

        const activationTokens = createActivationTokens(userData)
        const activationURL = `http://localhost:5173/activation/${activationTokens}`;
        await sendEmail({
                email: userData.email,
                subject: "Activate your account",
                message: generateEmailTemplate(activationURL, userData.name)
            })

        res.status(201).json({
                success: true,
                message: `Please check your email - ${userData.email} to activate your account!`
            })

    } catch(error){
        next(error)
    }
})

function createActivationTokens(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "10m"
    })
}

function generateEmailTemplate(activationURL, name) {
    return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Account Verification</title>
            </head>
        <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:30px 0;">
                <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
                    
                    <tr>
                    <td style="background:#4f46e5; color:#ffffff; padding:20px; text-align:center; font-size:22px; font-weight:bold;">
                        Verify Your Account
                    </td>
                    </tr>

                    <tr>
                    <td style="padding:25px; color:#333333; font-size:16px;">
                        <p>Hello ${name},</p>
                        <p>Thank you for registering. Please click on the link below to activate your account:</p>
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

export const activateUser = catchAsyncError(async(req, res, next) => {
    try{
        const activation_token = req.body?.activation_token || req.body?.activationToken
        if(!activation_token){
            return next(new ErrorHandler("Activation token is required", 400))
        }
        if(!process.env.JWT_SECRET){
            return next(new ErrorHandler("Server configuration error", 500))
        }
        const user = jwt.verify(activation_token, process.env.JWT_SECRET)
        if(!user){
            return next(new ErrorHandler("Invalid token", 400))
        }
        const {name, email, password, avatar} = user
        let existingUser = await User.findOne({email})
        if(existingUser){
            return next(new ErrorHandler("User already exists", 400))
        }
        const newUser = await User.create({
            name,
            email,
            password,
            avatar,
            accountVerified: true
        })
        sendTokens(newUser, 201, res)
    } catch(error){
        console.error("Activation error:", error)
        // Let error middleware handle JWT errors (JsonWebTokenError, TokenExpiredError)
        if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
            return next(error)
        }
        return next(new ErrorHandler(error?.message ?? "Activation failed", 500))
    }
})


export const loginUser = catchAsyncError(async(req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return next(new ErrorHandler("Please provide email and password", 400))
        }

        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorHandler("Invalid email or password", 401 ))
        }
        
        const isPasswordMatched = await user.comparePassword(password)
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password", 401))
        }
        sendTokens(user, 200, res)
    } catch(error){
            next(error)
    }
})

export const loadUser = catchAsyncError(async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        if(!user){
            return next(new ErrorHandler("User not found", 404))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

// log out user
export const logoutUser = catchAsyncError(async(req, res, next) => {
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })  
        res.status(201).json({
            success: true,
            message: "Logout successfully!"
        })     
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}) 

// update user profile
export const updateUser = catchAsyncError(async(req, res, next) => {
    try {
        const {name, email, password, phoneNumber} = req.body
        const { user } = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("User doesn't exist", 401))
        }
        const isPasswordMatched = await user.comparePassword(password)
        if(!isPasswordMatched){
            return next(new ErrorHandler(error.message, 400))
        }
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber
        await user.save();
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

export const updateAddresses = catchAsyncError(async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const sameTypeAddress = user.addresses.find(
            address => address.addressType === req.body.addressType
        )
        if(sameTypeAddress){
            return next(new ErrorHandler(`${req.body.addressType} address already exists`, 401))
        }
        const existsAddress = user.addresses.find(
            address => address._id === req.body._id
        )
        if(existsAddress){
            Object.assign(existsAddress, req.body)
        }else{
            user.addresses.push(req.body)
        }
        await user.save()
        res.status(200).json({success: true, user})
    } catch (error){
        return next(new ErrorHandler(error.message, 500))
    }
})

export const deleteUserAddress = catchAsyncError(async(req, res, next) => {
    try {
        const userId = req.user._id
        const addressId = req.params.id;
        await User.updateOne(
            {
                _id: userId
            },
            {
                $pull: { addresses: {_id: addressId} }
            }
        )
        const user = await User.findById(userId)
        res.status(201).json({success: true, user})
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

export const updateUserPassword = catchAsyncError(async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("+password")
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
        if(!isPasswordMatched){
            return res.status(400).json({success: false, message: "Old Password is incorrect!"})
        }
        if (req.body.newPassword !== req.body.confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password doesn't match with existing one!"
            })
        }
        user.password = req.body.newPassword;
        await user.save()
        res.status(201).json({success: true, message: "Password Updated successfully!"})
    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})