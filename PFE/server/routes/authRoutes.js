import express from 'express';
import { isAuthenticated, login, logOut, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail} from '../controllers/authController.js';
import { userAuth } from '../middelware/userAuth.js';
import { singleUpload } from '../middelware/upload.js';
export const authRouter = express.Router();
authRouter.post('/register',singleUpload.single("profilePhoto"),register);
authRouter.post('/login',login);
authRouter.post('/logout',logOut);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);



