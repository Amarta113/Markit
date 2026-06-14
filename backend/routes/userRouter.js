import express from 'express'
import { register, activateUser, loginUser, loadUser, logoutUser} from '../controller/userController.js';
import upload from '../multer.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router()
router.post("/register", upload.single("avatar"), register)
router.post("/activation", activateUser)
router.post("/login-user", loginUser);
router.get("/get-user", isAuthenticated, loadUser)
router.get("/logout-user", isAuthenticated, logoutUser)
export default router;