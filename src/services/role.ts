import { HTTP_CODES } from '../constants/common.js';
import { ROLES } from '../constants/role.js';
import {
  getRoles,
  addRoleToDB,
  getUserRoles,
  attachRoleToUser,
  getUserByUserId,
  dettachUserRole,
} from '../db/queries.js';
import { ERROR } from '../constants/common.js';

const getAllRolesService = async () => {
  try {
    const roles = await getRoles.all();
    if (!roles) {
      return {
        success: false,
        message: ROLES.ROLE_NOT_FOUND,
        httpCode: HTTP_CODES.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: ROLES.ROLES_FETCHED,
      roles,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: ROLES.ROLES_FETCHED,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const createRoleService = async (newRole: string) => {
  try {
    const newRoleAdded = await addRoleToDB.get(newRole);
    if (!newRoleAdded) {
      return {
        success: false,
        message: ROLES.UNABLE_TO_ADD_NEW_ROLE,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    return {
      success: true,
      message: ROLES.NEW_ROLE_ADDED,
      newRoleAdded,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - createRole!`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getUserRolesDetailsService = async (userId: number) => {
  try {
    const user = await getUserByUserId.get(userId);

    if (!user) {
      return {
        success: false,
        message: ROLES.USER_NOT_FOUND,
        httpCode: HTTP_CODES.NOT_FOUND,
      };
    }
    const roles = await getUserRoles.all(userId);
    if (!roles) {
      return {
        success: false,
        message: `${ROLES.ERROR_FETCHING_ROLES} - getUserRolesDetails`,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    const filteredRoles = roles.map((role) => role.role);

    return {
      success: true,
      message: ROLES.USER_ROLES_FETCHED,
      roles: filteredRoles,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserRoles`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const addUserRoleService = async (userId: number, roleId: number) => {
  try {
    const roleAddedToUser = await attachRoleToUser.get(userId, roleId);

    return {
      success: true,
      message: ROLES.ROLE_ATTACHED,
      roleAddedToUser,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addUserRole`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const removeUserRoleService = async (userId: number, roleId: number) => {
  try {
    await dettachUserRole.get(userId, roleId);
    return {
      success: true,
      message: `${ROLES.ROLE_REMOVED} from userId: ${userId}, roleId: ${roleId}`,
      httpCode: HTTP_CODES.DELETED,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - removeUserRole`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

export {
  getAllRolesService,
  createRoleService,
  getUserRolesDetailsService,
  addUserRoleService,
  removeUserRoleService,
};
