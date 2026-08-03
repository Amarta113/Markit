import { Shop } from "../models/shop.js";
import Product from '../models/product.js'
import cloudinary from "../config/cloudinary.js";
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import Order from '../models/order.js'
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

export async function createReviewForProduct(req, res) {
    try {
        const { user, rating, message, productId, orderId } = req.body

        const product = await Product.findById(productId)

        const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id)

        const review = {
            user,
            rating,
            comment,
            productId
        }

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user._id === req.user._id) {
                    (rev.rating = rating),
                        (rev.comment = comment),
                        (rev.user = user)
                }
            })
        } else {
            product.reviews.push(review)
        }

        let avg = 0;
        product.reviews.forEach((rev) => {
            avg += rev.rating
        })

        product.ratings = avg / product.reviews.length

        await product.save({ validateBeforeSave: false })
        await Order.findByIdAndUpdate(orderId,
            {
                $set: { "cart.$[elem].isReviewed": true }
            },
            {
                arrayFilters: [{ "elem._id": productId }],
                new: true
            }
        )
        res.status(200).json({
            success: true,
            message: "Review successfully!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server Error" })
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
