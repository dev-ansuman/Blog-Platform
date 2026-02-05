import express from 'express';
const roleRoutes = express.Router({ mergeParams: true });
import { authMiddleware } from '../middleware/authentication.js';
import { adminMiddleware } from '../middleware/admin.js';
import {
  getUserRolesDetails,
  addUserRole,
  removeUserRole,
  createRole,
  getAllRoles,
} from '../controllers/role.js';

roleRoutes.get('/all', authMiddleware, adminMiddleware, getAllRoles);
roleRoutes.post('/make-role', authMiddleware, adminMiddleware, createRole);
roleRoutes.get('/', authMiddleware, adminMiddleware, getUserRolesDetails);
roleRoutes.post('/', authMiddleware, adminMiddleware, addUserRole);
roleRoutes.delete('/:roleId', authMiddleware, adminMiddleware, removeUserRole);

export default roleRoutes;
