import type { Request, Response } from 'express';
import {
  getAllRolesService,
  createRoleService,
  getUserRolesDetailsService,
  addUserRoleService,
  removeUserRoleService,
} from '../services/role.js';

const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRolesService();

    if (roles.success) return res.status(200).json(roles);
    else return res.status(400).json(roles);
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: 'All roles fetched!',
      error,
    });
  }
};

const createRole = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return {
        success: false,
        message: 'Please enter body',
      };
    }
    const newRole = req.body.role;

    const newRoleAdded = await createRoleService(newRole);

    if (newRoleAdded.success) return res.status(200).json(newRoleAdded);
    else return res.status(400).json(newRoleAdded);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - createRole!',
      error,
    });
  }
};

const getUserRolesDetails = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: 'Please select a user!',
      });
    }

    const userId = Number(req.params.userId);
    const roles = await getUserRolesDetailsService(userId);

    if (roles.success) return res.status(200).json(roles);
    else return res.status(400).json(roles);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - getUserRoles',
      error,
    });
  }
};

const addUserRole = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: 'Please select a user!',
      });
    }
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter body',
      });
    }
    const userId = Number(req.params.userId);
    const roleId = req.body.roleId;

    const roleAdded = await addUserRoleService(userId, roleId);

    return res.status(200).json(roleAdded);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - addUserRole',
      error,
    });
  }
};

const removeUserRole = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: 'Please select a user and role!',
      });
    }

    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);

    const roleRemoved = await removeUserRoleService(userId, roleId);

    return res.status(200).json(roleRemoved);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - removeUserRole',
      error,
    });
  }
};

export { getAllRoles, createRole, getUserRolesDetails, addUserRole, removeUserRole };
