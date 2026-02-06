import express from 'express';
const userRouter = express.Router();
import { authMiddleware } from '../middleware/authentication.js';
import {
  getUserDetail,
  updateUserDetails,
  updateUserPassword,
  deleteUser,
} from '../controllers/userProfile.js';

userRouter.get('/me', authMiddleware, getUserDetail);
userRouter.put('/me', authMiddleware, updateUserDetails);
userRouter.patch('/me/password', authMiddleware, updateUserPassword);
userRouter.delete('/me', authMiddleware, deleteUser);

export default userRouter;
