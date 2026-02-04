import type { Request, Response } from 'express';
import {
  getAllUsers,
  getUserByUserId,
  updateUserDetailsById,
  deleteUserById,
} from '../db/queries.js';

const getAllUserData = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers.all();
    if (!users) {
      return res.status(400).json({
        success: false,
        message: 'error fetching users!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'all users',
      users,
    });
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
    const user = await getUserByUserId.get(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User found!',
      user,
    });
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
    const userId = Number(req.params.userId);

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
      message: `User Details update by Admin-${req.userInfo!.role} successful!`,
      updatedUser,
    });
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
    const userId = Number(req.params.userId);
    await deleteUserById.get(userId);

    return res.status(200).json({
      success: true,
      message: `UserId: ${userId} deleted successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - deleteUser',
      error,
    });
  }
};

export { getAllUserData, getUserDataById, updateUserDetails, deleteUser };
