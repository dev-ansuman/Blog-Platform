import {
  getUserByUserId,
  updateUserDetailsById,
  getUsername,
  getEmail,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserById,
} from '../db/queries.js';
import { getCurrentTime } from '../helpers/getCurrentTime.js';
import { checkEmail } from '../helpers/checkEmail.js';
import bcrypt from 'bcryptjs';
import { getHashedPassword } from '../helpers/getHashedPassword.js';
import { USER } from '../constants/userProfile.js';
import { ERROR, HTTP_CODES } from '../constants/common.js';

const getUserDetailService = async (userId: number) => {
  try {
    const detail = await getUserByUserId.get(userId);
    return {
      success: true,
      message: USER.USER_DETAILS_FETCHED,
      detail,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserDetail`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const updateUserDetailsService = async (
  newUsername: string,
  newFullname: string,
  newEmail: string,
  userId: number
) => {
  try {
    const usernameExists = getUsername.get(newUsername);
    if (usernameExists) {
      return {
        sucsess: false,
        message: USER.USERNAME_TAKEN,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    const emailExists = getEmail.get(newEmail);
    if (emailExists) {
      return {
        sucsess: false,
        message: USER.EMAIL_TAKEN,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    if (!checkEmail(newEmail)) {
      return {
        success: false,
        message: USER.INVALID_EMAIL,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    if (newUsername.length < 3) {
      return {
        success: false,
        message: USER.USERNAME_ATLEAST,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    if (newUsername.length > 10) {
      return {
        success: false,
        message: USER.USERNAME_ATMOST,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    const updatedUser = await updateUserDetailsById.get(
      newUsername,
      newFullname,
      newEmail,
      getCurrentTime(),
      userId
    );

    return {
      success: true,
      message: USER.USER_DETAILS_UPDATED,
      updatedUser,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - updateUserDetails`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const updateUserPasswordService = async (
  oldPassword: string,
  newPassword: string,
  username: string
) => {
  try {
    const user = getUserByUsername.get(username);
    if (!user) {
      return {
        success: false,
        message: USER.NOT_FOUND,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    const isPasswordValid = await bcrypt.compare(oldPassword as string, user.password as string);

    if (!isPasswordValid) {
      return {
        success: false,
        message: USER.INVALID_PASSWORD,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }
    const newHashedPassword = await getHashedPassword(newPassword);

    user.password = newHashedPassword;
    updateUserPasswordByUsername.get(newHashedPassword, username);

    return {
      success: true,
      message: `${username}, ${USER.PASSWORD_UPDATED}`,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: true,
      message: `${ERROR.INTERNAL_SERVER} - updateUserPassword`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const deleteUserService = async (userId: number, username: string) => {
  try {
    await deleteUserById.get(userId);

    return {
      success: true,
      message: `User: ${username}, ${USER.USER_DELETED}`,
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

export {
  getUserDetailService,
  updateUserDetailsService,
  updateUserPasswordService,
  deleteUserService,
};
