import { getAllUsers, getUserByUserId, deleteUserById } from '../db/queries.js';

const getAllUserDataService = async () => {
  const users = await getAllUsers.all();
  return {
    success: true,
    message: 'All Users',
    totalUsers: users.length,
    users,
  };
};

const getUserDataByIdService = async (userId: number) => {
  const user = await getUserByUserId.get(userId);
  if (!user) {
    return {
      success: false,
      message: 'User not found!',
    };
  }

  return {
    success: true,
    message: 'User found!',
    user,
  };
};

const deleteUserService = async (userId: number) => {
  const user = getUserByUserId.get(userId);
  if (!user) {
    return {
      success: false,
      message: 'User not found!',
    };
  }

  await deleteUserById.get(userId);

  return {
    success: true,
    message: `User: ${user.username}, deleted successfully`,
  };
};

export { getAllUserDataService, getUserDataByIdService, deleteUserService };
