import express from 'express'
import { createShop, activateSeller, loginSeller, loadSeller, logoutSeller} from '../controller/shopController.js';
import upload from '../multer.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { isAuthenticated } from '../middleware/auth.js';

const shopRouter = express.Router()
shopRouter.post("/create-seller", upload.single("avatar"), createShop)
shopRouter.post("/seller-account/activation", activateSeller)
shopRouter.post("/login-seller", loginSeller);
shopRouter.get("/get-seller", isAuthenticated, loadSeller)
shopRouter.get("/logout-seller", isAuthenticated, logoutSeller)
export default shopRouter;