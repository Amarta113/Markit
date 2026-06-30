import express from 'express'
import upload from '../multer.js'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createProduct, getAllProductsShop, deleteProduct } from '../controller/productController.js'

const productRouter = express.Router()

productRouter.post('/create-product', upload.array("images"), createProduct)
productRouter.get('/get-all-products-shop/:id', getAllProductsShop)
productRouter.delete('/delete-shop-product/:id', isSeller, deleteProduct)
export default productRouter