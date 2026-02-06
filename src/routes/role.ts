import express from 'express';
const roleRoutes = express.Router({ mergeParams: true });
import { authMiddleware } from '../middleware/authentication.js';
import {
  getUserRolesDetails,
  addUserRole,
  removeUserRole,
  createRole,
  getAllRoles,
} from '../controllers/role.js';
import { superAdminMiddleware } from '../middleware/superAdmin.js';

roleRoutes.get('/all', authMiddleware, superAdminMiddleware, getAllRoles);
roleRoutes.post('/make-role', authMiddleware, superAdminMiddleware, createRole);
roleRoutes.get('/', authMiddleware, superAdminMiddleware, getUserRolesDetails);
roleRoutes.post('/', authMiddleware, superAdminMiddleware, addUserRole);
roleRoutes.delete('/:roleId', authMiddleware, superAdminMiddleware, removeUserRole);

export default roleRoutes;
