import express from 'express'
import upload from '../multer.js'
import {isAuthenticated, isSeller} from '../middleware/auth.js'
import { createProduct } from '../controller/productController.js'

const productRouter = express.Router()

productRouter.post('/create-product', upload.array("images"), createProduct)

export default productRouter