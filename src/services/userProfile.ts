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
      message: 'Username Taken! choose another username',
    };
  }

  const emailExists = getEmail.get(newEmail);
  if (emailExists) {
    return {
      sucsess: false,
      message: 'Email Taken! choose another email',
    };
  }

  if (!checkEmail(newEmail)) {
    return {
      success: false,
      message: 'Invalid Email Address!',
    };
  }

  if (newUsername.length < 3) {
    return {
      success: false,
      message: 'username should be atleast 3 characters!',
    };
  }

  if (newUsername.length > 10) {
    return {
      success: false,
      message: 'username should be atmost 10 characters!',
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
    message: 'User Details updated successfully!',
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
      message: 'User not found!',
    };
  }

  const isPasswordValid = await bcrypt.compare(oldPassword as string, user.password as string);

  if (!isPasswordValid) {
    return {
      success: false,
      message: 'Invalid password!',
    };
  }
  const newHashedPassword = await getHashedPassword(newPassword);

  user.password = newHashedPassword;
  updateUserPasswordByUsername.get(newHashedPassword, username);

  return {
    success: true,
    message: `${username}, password update successfully`,
  };
};

const deleteUserService = async (userId: number, username: string) => {
  await deleteUserById.get(userId);

  return {
    success: true,
    message: `User: ${username} deleted successfully!`,
  };
};
export {
  getUserDetailService,
  updateUserDetailsService,
  updateUserPasswordService,
  deleteUserService,
};
