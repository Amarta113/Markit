import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        minLength: [8, "Password must have at least 8 characters."],
        maxLength: [32, "Password cannot have more than 32 characters."]
    },
    addresses: [
        {
            country: { type: String },
            city: { type: String },
            address1: { type: String },
            address2: { type: String },
            zipCode: { type: Number },
            addressType: {
                type: String
            },
        }
    ],
    phoneNumber: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, 
    accountVerified: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// hash password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


export const User = mongoose.model("User", userSchema)