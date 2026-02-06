import type { Request, Response } from 'express';
import {
  loginUserService,
  registerUserService,
  renewAccessTokenService,
} from '../services/authentication.js';
import { ERROR, REQUIRED } from '../constants/common.js';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, fullname, email, password } = req.body;
    const newUser = await registerUserService(username, fullname, email, password);

    if (newUser.success) {
      return res.status(201).json(newUser);
    } else {
      return res.status(400).json(newUser);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - User Registration`,
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: REQUIRED.REQUIRED_FIELDS,
      });
    }

    const loggedInUser = await loginUserService(username, password);
    const accessToken = loggedInUser.accessToken;
    const refreshToken = loggedInUser.refreshToken;

    if (loggedInUser.success) {
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        accessToken,
      });
    } else {
      return res.status(400).json(loggedInUser);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - User Login`,
      error,
    });
  }
};

const renewAccessToken = async (req: Request, res: Response) => {
  try {
    const cookieHeader = req.headers.cookie;
    const accessToken = await renewAccessTokenService(cookieHeader);

    if (accessToken.success) {
      return res.status(201).json(accessToken);
    } else {
      return res.status(400).json(accessToken);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - renewAccessToken!`,
      error,
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({
      success: true,
      message: 'Logged out sucessfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - Logout User`,
      error,
    });
  }
};

export { registerUser, loginUser, renewAccessToken, logoutUser };
