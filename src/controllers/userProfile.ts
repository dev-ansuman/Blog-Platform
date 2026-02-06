import type { Request, Response } from 'express';
import {
  getUserDetailService,
  updateUserDetailsService,
  updateUserPasswordService,
  deleteUserService,
} from '../services/userProfile.js';

import { REQUIRED } from '../constants/common.js';

const getUserDetail = async (req: Request, res: Response) => {
  const userId = req.userInfo!.userId;
  const detail = await getUserDetailService(userId);

  if (detail.success) {
    return res.status(200).json({
      success: detail.success,
      message: detail.message,
      detail: detail.detail,
    });
  } else {
    return res.status(detail.httpCode).json({
      success: detail.success,
      message: detail.message,
    });
  }
};

const updateUserDetails = async (req: Request, res: Response) => {
  const userId = req.userInfo!.userId;

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: `${REQUIRED.REQUIRED_FIELDS}`,
    });
  }

  const { newUsername, newFullname, newEmail } = req.body;

  if (!newUsername || !newFullname || !newEmail) {
    return res.status(400).json({
      success: false,
      message: `${REQUIRED.REQUIRED_FIELDS}`,
    });
  }

  const updatedUser = await updateUserDetailsService(newUsername, newFullname, newEmail, userId);

  if (updatedUser.success) {
    return res.status(200).json({
      success: updatedUser.success,
      message: updatedUser.message,
      updatedUser: updatedUser.updatedUser,
    });
  } else {
    return res.status(updatedUser.httpCode).json({
      success: updatedUser.success,
      message: updatedUser.message,
    });
  }
};

const updateUserPassword = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
  const { oldPassword, newPassword } = req.body;

  const username = req.userInfo!.username;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }

  const updatePassword = await updateUserPasswordService(oldPassword, newPassword, username);

  if (updatePassword.success)
    return res.status(200).json({
      success: updatePassword.success,
      message: updatePassword.message,
    });
  else
    return res.status(updatePassword.httpCode).json({
      success: updatePassword.success,
      message: updatePassword.message,
    });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.userInfo!.userId;
  const username = req.userInfo!.username;

  const deletedUser = await deleteUserService(userId, username);

  return res.status(deletedUser.httpCode).json({
    success: deletedUser.success,
    message: deletedUser.message,
  });
};

export { getUserDetail, updateUserDetails, updateUserPassword, deleteUser };
