import express from 'express';
import { userAuth } from '../middelware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
import { updateProfile } from '../controllers/authController.js';
import {upload} from '../middelware/upload.js'
export const userRouter = express.Router();
userRouter.get('/data' ,userAuth,getUserData)
userRouter.put('/update/profile',userAuth,upload,updateProfile)