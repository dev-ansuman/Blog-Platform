import type { Request, Response } from 'express';
import {
  getUserDetailService,
  updateUserDetailsService,
  updateUserPasswordService,
  deleteUserService,
} from '../services/userProfile.js';

const getUserDetail = async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo!.userId;
    const detail = await getUserDetailService(userId);

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

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields (BODY)!',
      });
    }

    const { newUsername, newFullname, newEmail } = req.body;

    if (!newUsername || !newFullname || !newEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields!',
      });
    }

    const updatedUser = await updateUserDetailsService(newUsername, newFullname, newEmail, userId);

    if (updatedUser.success) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json(updatedUser);
    }
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
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields (BODY)!',
      });
    }
    const { oldPassword, newPassword } = req.body;

    const username = req.userInfo!.username;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all required fields!',
      });
    }

    const updatePassword = await updateUserPasswordService(oldPassword, newPassword, username);

    if (updatePassword.success) return res.status(200).json(updatePassword);
    else return res.status(400).json(updatePassword);
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

    const deletedUser = await deleteUserService(userId, username);

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - deleteUser',
      error,
    });
  }
};

export { getUserDetail, updateUserDetails, updateUserPassword, deleteUser };
