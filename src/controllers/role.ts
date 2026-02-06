import type { Request, Response } from 'express';
import {
  getAllRolesService,
  createRoleService,
  getUserRolesDetailsService,
  addUserRoleService,
  removeUserRoleService,
} from '../services/role.js';
import { ROLES } from '../constants/role.js';
import { REQUIRED } from '../constants/common.js';

const getAllRoles = async (req: Request, res: Response) => {
  const roles = await getAllRolesService();

  if (roles.success)
    return res.status(200).json({
      success: roles.success,
      message: roles.message,
      roles: roles.roles,
    });
  else
    return res.status(roles.httpCode).json({
      success: roles.success,
      message: roles.message,
    });
};

const createRole = async (req: Request, res: Response) => {
  if (!req.body) {
    return {
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    };
  }
  const newRole = req.body.role;

  const newRoleAdded = await createRoleService(newRole);

  if (newRoleAdded.success)
    return res.status(200).json({
      success: newRoleAdded.success,
      message: newRoleAdded.message,
      newRole: newRoleAdded.newRoleAdded,
    });
  else
    return res.status(newRoleAdded.httpCode).json({
      success: newRoleAdded.success,
      message: newRoleAdded.message,
    });
};

const getUserRolesDetails = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: ROLES.USER_NOT_SELECTED,
    });
  }

  const userId = Number(req.params.userId);
  const roles = await getUserRolesDetailsService(userId);

  if (roles.success)
    return res.status(200).json({
      success: roles.success,
      message: roles.message,
      roles: roles.roles,
    });
  else
    return res.status(roles.httpCode).json({
      success: roles.success,
      message: roles.message,
    });
};

const addUserRole = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: ROLES.USER_NOT_SELECTED,
    });
  }
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
  const userId = Number(req.params.userId);
  const roleId = req.body.roleId;

  const roleAdded = await addUserRoleService(userId, roleId);

  if (roleAdded.success)
    return res.status(200).json({
      success: roleAdded.success,
      message: roleAdded.message,
      roleAddedToUser: roleAdded.roleAddedToUser,
    });
  else
    return res.status(roleAdded.httpCode).json({
      success: roleAdded.success,
      message: roleAdded.message,
    });
};

const removeUserRole = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }

  const userId = Number(req.params.userId);
  const roleId = Number(req.params.roleId);

  const roleRemoved = await removeUserRoleService(userId, roleId);

  return res.status(roleRemoved.httpCode).json({
    success: roleRemoved.success,
    message: roleRemoved.message,
  });
};

export { getAllRoles, createRole, getUserRolesDetails, addUserRole, removeUserRole };
