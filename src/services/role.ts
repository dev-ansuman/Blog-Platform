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
      message: 'Roles not found!',
    };
  }
  return {
    success: true,
    message: 'Roles Fetched',
    roles,
  };
};

const createRoleService = async (newRole: string) => {
  const newRoleAdded = await addRoleToDB.get(newRole);
  if (!newRoleAdded) {
    return {
      success: false,
      message: 'Unable to add new role!',
    };
  }

  return {
    success: true,
    message: 'New role added!',
    newRoleAdded,
  };
};

const getUserRolesDetailsService = async (userId: number) => {
  const user = await getUserByUserId.get(userId);

  if (!user) {
    return {
      success: false,
      message: 'User not found!',
    };
  }
  const roles = await getUserRoles.all(userId);
  if (!roles) {
    return {
      success: false,
      message: 'Error in getting Roles - getUserRolesDetails',
    };
  }

  const filteredRoles = roles.map((role) => role.role);

  return {
    success: true,
    message: 'User roles fetched successfully!',
    roles: filteredRoles,
  };
};

const addUserRoleService = async (userId: number, roleId: number) => {
  const roleAddedToUser = await attachRoleToUser.get(userId, roleId);

  return {
    success: true,
    message: 'Role added to user!',
    roleAddedToUser,
  };
};

const removeUserRoleService = async (userId: number, roleId: number) => {
  await dettachUserRole.get(userId, roleId);
  return {
    success: true,
    message: `roleId: ${roleId}, removed from userId: ${userId}`,
  };
};

export {
  getAllRolesService,
  createRoleService,
  getUserRolesDetailsService,
  addUserRoleService,
  removeUserRoleService,
};
