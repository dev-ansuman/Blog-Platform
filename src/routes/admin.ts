import express from 'express';
const adminRoutes = express.Router();
import { adminMiddleware } from '../middleware/admin.js';
import {
  getAllUserData,
  getUserDataById,
  updateUserDetails,
  deleteUser,
} from '../controllers/admin.js';
import { authMiddleware } from '../middleware/authentication.js';

adminRoutes.get('/', authMiddleware, adminMiddleware, getAllUserData);
adminRoutes.get('/:userId', authMiddleware, adminMiddleware, getUserDataById);
adminRoutes.put('/:userId', authMiddleware, adminMiddleware, updateUserDetails);
adminRoutes.delete('/:userId', authMiddleware, adminMiddleware, deleteUser);

export default adminRoutes;
