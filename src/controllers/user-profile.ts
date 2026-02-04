import type { Request, Response } from 'express';
import {
  deleteUserById,
  getUserByUserId,
  getUserByUsername,
  updateUserDetailsById,
  updateUserPasswordByUsername,
} from '../db/queries.js';
import bcrypt from 'bcryptjs';

const getUserDetail = async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo!.userId;
    const detail = await getUserByUserId.get(userId);

    return res.status(200).json({
      success: true,
      message: 'User Details fetched successfully!',
      detail,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - getUserDetail',
      error,
    });
  }
};

const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo!.userId;

    const { newUsername, newFullname, newEmail } = req.body;
    const lastUpdateAt = new Date().toISOString();

    const updatedUser = await updateUserDetailsById.get(
      newUsername,
      newFullname,
      newEmail,
      lastUpdateAt,
      userId
    );

    return res.status(200).json({
      success: true,
      message: 'User Details updated successfully!',
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - updateUserDetails',
      error,
    });
  }
};

const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const username = req.userInfo!.username;

    const user = getUserByUsername.get(username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword as string, user.password as string);

    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: 'Invalid password!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    updateUserPasswordByUsername.get(newHashedPassword, username);

    return res.status(200).json({
      success: true,
      message: `${username}, password update successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: 'Internal server error - updateUserPassword',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo!.userId;
    const username = req.userInfo!.username;
    await deleteUserById.get(userId);

    return res.status(200).json({
      success: true,
      message: `User: ${username} deleted successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - deleteUser',
      error,
    });
  }
};

export { getUserDetail, updateUserDetails, updateUserPassword, deleteUser };
