import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.js"
import { User } from "../models/userModel.js"
import ErrorHandler from "./error.js"

export const isAuthenticated = catchAsyncError(async(req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return next(new ErrorHandler("Unauthorized! Please login to access this resource", 401))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        if(!req.user){
            return next(new ErrorHandler("User not found", 404))
        }
        next()
    } catch(error){
        return next(new ErrorHandler("Invalid token", 401))
    }
})

export async function isSeller(req, res, next) {
  try {
    const { seller_token } = req.cookies;
    if (!seller_token) {
      return res.status(401).json({ message: "Unauthorized. Login Required!" });
    }
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);
    req.seller = await Shop.findById(decoded.id);
    if (!req.seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
