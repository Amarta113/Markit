import { Shop } from "../models/shop.js";
import Product from '../models/product.js'
import cloudinary from "../config/cloudinary.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'

export async function createProduct(req, res) {
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return res.status(400).json({ message: "ShopID is invalid!" })
        }
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
        res.status(201).json({ success: true, product })

    }
    catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}

export async function getAllProductsShop(req, res) {
    try {
        const products = await Product.find({ shopId: req.params.id })
        res.status(201).json({
            success: true,
            products
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const productData = await Product.findById(productId)
        if (!productData) {
            return res.status(404).json({ success: false, message: "Product not found with this id!" })
        }
        const deletionPromises = productData.images.map(img => {
            const publicId = img.public_id;
            return cloudinary.uploader.destroy(`ecommerce_uploads/${publicId}`)
        })
        await Promise.all(deletionPromises);
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted succesffully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server Error" })
    }
}
