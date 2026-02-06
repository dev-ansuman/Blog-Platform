import { USERS } from '../constants/admin.js';
import { getAllUsers, getUserByUserId, deleteUserById } from '../db/queries.js';
import { ERROR, HTTP_CODES } from '../constants/common.js';

const getAllUserDataService = async () => {
  try {
    const users = await getAllUsers.all();
    return {
      success: true,
      message: USERS.USERS_FETCHED,
      totalUsers: users.length,
      users,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getAllUserData`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getUserDataByIdService = async (userId: number) => {
  try {
    const user = await getUserByUserId.get(userId);
    if (!user) {
      return {
        success: false,
        message: USERS.USER_NOT_FOUND,
        httpCode: HTTP_CODES.NOT_FOUND,
      };
    }

    return {
      success: true,
      message: USERS.USER_FOUND,
      user,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserDataById`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteUserService = async (userId: number) => {
  try {
    const user = getUserByUserId.get(userId);
    if (!user) {
      return {
        success: false,
        message: USERS.USER_NOT_FOUND,
        httpCode: HTTP_CODES.NOT_FOUND,
      };
    }

    await deleteUserById.get(userId);

    return {
      success: true,
      message: `${user.username}, ${USERS.USER_DELETED}`,
      httpCode: HTTP_CODES.DELETED,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - deleteUser`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

export { getAllUserDataService, getUserDataByIdService, deleteUserService };
