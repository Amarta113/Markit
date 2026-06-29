import { Shop } from "../models/shop.js";
import Product from '../models/product.js'
import cloudinary from "../config/cloudinary.js";

export async function createProduct(req, res){
    try{
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if(!shop){
             return res.status(400).json({message: "ShopID is invalid!"})
        } else {
            const files = req.files
            const imgData = files.map(file => ({
                public_id: file.filename.split('.')[0],
                url: file.path
            }))
            const productData = {
                ...req.body,
                images: imgData,
                shop
            }
            const product = await Product.create(productData)
            res.status(201).json({success: true, product})
        }
    }
    catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}