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

const getUserDetailService = async (userId: number) => {
  return await getUserByUserId.get(userId);
};

const updateUserDetailsService = async (
  newUsername: string,
  newFullname: string,
  newEmail: string,
  userId: number
) => {
  const usernameExists = getUsername.get(newUsername);
  if (usernameExists) {
    return {
      sucsess: false,
      message: USER.USERNAME_TAKEN,
    };
  }

  const emailExists = getEmail.get(newEmail);
  if (emailExists) {
    return {
      sucsess: false,
      message: USER.EMAIL_TAKEN,
    };
  }

  if (!checkEmail(newEmail)) {
    return {
      success: false,
      message: USER.INVALID_EMAIL,
    };
  }

  if (newUsername.length < 3) {
    return {
      success: false,
      message: USER.USERNAME_ATLEAST,
    };
  }

  if (newUsername.length > 10) {
    return {
      success: false,
      message: USER.USERNAME_ATMOST,
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
  };
};

const updateUserPasswordService = async (
  oldPassword: string,
  newPassword: string,
  username: string
) => {
  const user = getUserByUsername.get(username);
  if (!user) {
    return {
      success: false,
      message: USER.NOT_FOUND,
    };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword as string, user.password as string);

  if (!isPasswordValid) {
    return {
      success: false,
      message: USER.INVALID_PASSWORD,
    };
  }
  const newHashedPassword = await getHashedPassword(newPassword);

  user.password = newHashedPassword;
  updateUserPasswordByUsername.get(newHashedPassword, username);

  return {
    success: true,
    message: `${username}, ${USER.PASSWORD_UPDATED}`,
  };
};

const deleteUserService = async (userId: number, username: string) => {
  await deleteUserById.get(userId);

  return {
    success: true,
    message: `User: ${username}, ${USER.USER_DELETED}`,
  };
};

export {
  getUserDetailService,
  updateUserDetailsService,
  updateUserPasswordService,
  deleteUserService,
};
