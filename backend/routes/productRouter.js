import express from 'express'
import upload from '../multer.js'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createProduct, getAllProductsShop, deleteProduct, createReviewForProduct, getAllProducts } from '../controller/productController.js'

const productRouter = express.Router()

productRouter.post('/create-product', upload.array("images"), createProduct)
productRouter.get('/get-all-products-shop/:id', getAllProductsShop)
productRouter.get('/get-all-products', getAllProducts)
productRouter.delete('/delete-shop-product/:id', isSeller, deleteProduct)
productRouter.put('/create-new-review', isAuthenticated, createReviewForProduct)
export default productRouter