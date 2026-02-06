import type { Request, Response } from 'express';
import {
  loginUserService,
  registerUserService,
  renewAccessTokenService,
} from '../services/authentication.js';
import { ERROR, HTTP_CODES, REQUIRED } from '../constants/common.js';
import { USERNAME } from '../constants/authentication.js';

const registerUser = async (req: Request, res: Response) => {
  const { username, fullname, email, password } = req.body;
  const newUser = await registerUserService(username, fullname, email, password);

  if (newUser.success) {
    return res.status(201).json({
      success: newUser.success,
      message: newUser.message,
      user: newUser.newUser,
    });
  } else {
    return res.status(newUser.httpCode as number).json({
      success: newUser.success,
      message: newUser.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(HTTP_CODES.INVALID_REQUEST).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
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
    return res.status(loggedInUser.httpCode as number).json({
      success: loggedInUser.success,
      message: loggedInUser.message,
    });
  }
};

const renewAccessToken = async (req: Request, res: Response) => {
  const cookieHeader = req.headers.cookie;
  const accessToken = await renewAccessTokenService(cookieHeader);

  if (accessToken.success) {
    return res.status(accessToken.httpCode).json({
      success: accessToken.success,
      message: accessToken.message,
      accessToken: accessToken.accessToken,
    });
  } else {
    return res.status(accessToken.httpCode).json({
      success: accessToken.success,
      message: accessToken.message,
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
      message: USERNAME.LOGOUT_USER,
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
