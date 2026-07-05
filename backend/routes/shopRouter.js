import express from 'express'
import { createShop, activateSeller, loginSeller, loadSeller, logoutSeller, getShopInfo} from '../controller/shopController.js';
import upload from '../multer.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { isSeller } from '../middleware/auth.js';

const shopRouter = express.Router()
shopRouter.post("/create-seller", upload.single("avatar"), createShop)
shopRouter.post("/activation", activateSeller)
shopRouter.post("/login-seller", loginSeller);
shopRouter.get("/get-seller", isSeller, loadSeller)
shopRouter.get("/logout-seller", isSeller, logoutSeller)
shopRouter.get('/get-shop-info/:id', getShopInfo)
export default shopRouter;