import type { Request, Response } from 'express';
import {
  deleteUserService,
  getAllUserDataService,
  getUserDataByIdService,
} from '../services/admin.js';
import { updateUserDetailsService } from '../services/userProfile.js';
import { REQUIRED } from '../constants/common.js';
import { USERS } from '../constants/admin.js';

const getAllUserData = async (req: Request, res: Response) => {
  const users = await getAllUserDataService();
  if (users.success)
    return res.status(200).json({
      success: users.success,
      message: users.message,
      users: users.users,
    });
  else
    return res.status(users.httpCode).json({
      success: users.success,
      message: users.message,
    });
};

const getUserDataById = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const user = await getUserDataByIdService(userId);

  if (user.success)
    return res.status(200).json({
      success: user.success,
      message: user.message,
      user: user.user,
    });
  else
    return res.status(user.httpCode).json({
      success: user.success,
      message: user.message,
    });
};

const updateUserDetails = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: USERS.USER_NOT_SELECTED,
    });
  }
  const userId = Number(req.params.userId);

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }

  const { newUsername, newFullname, newEmail } = req.body;

  if (!newUsername || !newFullname || !newEmail) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }

  const updatedUser = await updateUserDetailsService(newUsername, newFullname, newEmail, userId);

  if (updatedUser.success)
    return res.status(200).json({
      success: updatedUser.success,
      message: updatedUser.message,
      updatedUser: updatedUser.updatedUser,
    });
  else
    return res.status(updatedUser.httpCode).json({
      success: updatedUser.success,
      message: updatedUser.message,
    });
};

const deleteUser = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: USERS.USER_NOT_SELECTED,
    });
  }
  const userId = Number(req.params.userId);

  const deletedUser = await deleteUserService(userId);

  return res.status(deletedUser.httpCode).json({
    success: deletedUser.success,
    message: deletedUser.message,
  });
};

export { getAllUserData, getUserDataById, updateUserDetails, deleteUser };
