import { ROLES } from '../constants/role.js';
import {
  getRoles,
  addRoleToDB,
  getUserRoles,
  attachRoleToUser,
  getUserByUserId,
  dettachUserRole,
} from '../db/queries.js';

const getAllRolesService = async () => {
  const roles = await getRoles.all();
  if (!roles) {
    return {
      success: false,
      message: ROLES.ROLE_NOT_FOUND,
    };
  }
  return {
    success: true,
    message: ROLES.ROLES_FETCHED,
    roles,
  };
};

const createRoleService = async (newRole: string) => {
  const newRoleAdded = await addRoleToDB.get(newRole);
  if (!newRoleAdded) {
    return {
      success: false,
      message: ROLES.UNABLE_TO_ADD_NEW_ROLE,
    };
  }

  return {
    success: true,
    message: ROLES.NEW_ROLE_ADDED,
    newRoleAdded,
  };
};

const getUserRolesDetailsService = async (userId: number) => {
  const user = await getUserByUserId.get(userId);

  if (!user) {
    return {
      success: false,
      message: ROLES.USER_NOT_FOUND,
    };
  }
  const roles = await getUserRoles.all(userId);
  if (!roles) {
    return {
      success: false,
      message: `${ROLES.ERROR_FETCHING_ROLES} - getUserRolesDetails`,
    };
  }

  const filteredRoles = roles.map((role) => role.role);

  return {
    success: true,
    message: ROLES.USER_ROLES_FETCHED,
    roles: filteredRoles,
  };
};

const addUserRoleService = async (userId: number, roleId: number) => {
  const roleAddedToUser = await attachRoleToUser.get(userId, roleId);

  return {
    success: true,
    message: ROLES.ROLE_ATTACHED,
    roleAddedToUser,
  };
};

const removeUserRoleService = async (userId: number, roleId: number) => {
  await dettachUserRole.get(userId, roleId);
  return {
    success: true,
    message: `${ROLES.ROLE_REMOVED} from userId: ${userId}, roleId: ${roleId}`,
  };
};

export {
  getAllRolesService,
  createRoleService,
  getUserRolesDetailsService,
  addUserRoleService,
  removeUserRoleService,
};
