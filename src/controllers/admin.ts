import type { Request, Response } from 'express';
import {
  deleteUserService,
  getAllUserDataService,
  getUserDataByIdService,
} from '../services/admin.js';
import { updateUserDetailsService } from '../services/userProfile.js';

const getAllUserData = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserDataService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error - getAllUserData',
      error,
    });
  }
};

const getUserDataById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const user = await getUserDataByIdService(userId);
    if (user.success) return res.status(200).json(user);
    else return res.status(400).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - getUserDataById',
      error,
    });
  }
};

const updateUserDetails = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a user!`,
      });
    }
    const userId = Number(req.params.userId);

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
      message: 'Internal server error - admin updateUserDetails',
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        success: false,
        message: `Please select a user!`,
      });
    }
    const userId = Number(req.params.userId);

    const deletedUser = await deleteUserService(userId);

    if (deletedUser.success) return res.status(200).json(deletedUser);
    else return res.status(400).json(deletedUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - deleteUser',
      error,
    });
  }
};

export { getAllUserData, getUserDataById, updateUserDetails, deleteUser };
