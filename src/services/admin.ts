import { USERS } from '../constants/admin.js';
import { getAllUsers, getUserByUserId, deleteUserById } from '../db/queries.js';

const getAllUserDataService = async () => {
  const users = await getAllUsers.all();
  return {
    success: true,
    message: USERS.USERS_FETCHED,
    totalUsers: users.length,
    users,
  };
};

const getUserDataByIdService = async (userId: number) => {
  const user = await getUserByUserId.get(userId);
  if (!user) {
    return {
      success: false,
      message: USERS.USER_NOT_FOUND,
    };
  }

  return {
    success: true,
    message: USERS.USER_FOUND,
    user,
  };
};

const deleteUserService = async (userId: number) => {
  const user = getUserByUserId.get(userId);
  if (!user) {
    return {
      success: false,
      message: USERS.USER_NOT_FOUND,
    };
  }

  await deleteUserById.get(userId);

  return {
    success: true,
    message: `${user.username}, ${USERS.USER_DELETED}`,
  };
};

export { getAllUserDataService, getUserDataByIdService, deleteUserService };
