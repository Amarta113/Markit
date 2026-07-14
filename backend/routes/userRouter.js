import express from 'express'
import { register, activateUser, loginUser, loadUser, logoutUser, updateAddresses, updateUserPassword, updateUser, deleteUserAddress, updateUserAvatar} from '../controller/userController.js';
import upload from '../multer.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router()
router.post("/register", upload.single("avatar"), register)
router.post("/activation", activateUser)
router.post("/login-user", loginUser);
router.get("/get-user", isAuthenticated, loadUser)
router.get("/logout-user", isAuthenticated, logoutUser)
router.put("/update-user-info", isAuthenticated, updateUser)
router.put("/update-user-avatar", isAuthenticated, upload.single("image"), updateUserAvatar)
router.put("/update-user-addresses", isAuthenticated, updateAddresses)
router.put('/update-user-password', isAuthenticated, updateUserPassword)
router.delete('/delete-user-address/:id', isAuthenticated, deleteUserAddress)
export default router;