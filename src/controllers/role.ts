import type { Request, Response } from 'express';
import {
  attachRoleToUser,
  getUserRoles,
  dettachUserRole,
  addRoleToDB,
  getRoles,
} from '../db/queries.js';

const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await getRoles.all();
    return res.status(200).json({
      success: true,
      message: 'All roles fetched!',
      roles,
    });
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
    const newRole = req.body.role;
    const newRoleAdded = await addRoleToDB.get(newRole);
    return res.status(201).json({
      success: true,
      message: 'New role added!',
      newRoleAdded,
    });
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
    const userId = Number(req.params.userId);
    const roles = await getUserRoles.all(userId);
    if (!roles) {
      return res.status(400).json({
        success: false,
        message: 'Error in getting Roles - getUserRolesDetails',
      });
    }

    const filteredRoles = roles.map((role) => role.role);

    return res.status(200).json({
      success: true,
      message: 'User roles fetched successfully!',
      roles: filteredRoles,
    });
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
    const userId = Number(req.params.userId);
    const roleId = req.body.roleId;

    const roleAddedToUser = await attachRoleToUser.get(userId, roleId);

    return res.status(200).json({
      success: true,
      message: 'Role added to user!',
      roleAddedToUser,
    });
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
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.roleId);

    await dettachUserRole.get(userId, roleId);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - removeUserRole',
      error,
    });
  }
};

export { getAllRoles, createRole, getUserRolesDetails, addUserRole, removeUserRole };
