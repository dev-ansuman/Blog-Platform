import { addUser, getUserByUsername } from '../db/queries.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, fullname, email, password } = req.body;

    let role = req.body.role;

    if (!role) {
      role = 'user';
    }

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter all required details!',
      });
    }

    // hash the password before storing in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // get time of creation of user
    const createdAt = new Date().toISOString();

    const newUser = addUser.get(username, fullname, email, hashedPassword, role, createdAt);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error: User Registration',
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
        message: 'Enter all required details!',
      });
    }
    const user = getUserByUsername.get(username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password as string);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password!',
      });
    }

    const accessToken = jwt.sign(
      {
        username: user.username,
        userId: user.userId,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '10m',
      }
    );

    const refreshToken = jwt.sign(
      {
        username: user.username,
        userId: user.userId,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `${user.username}, you are successfully logged in!`,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error: User Login',
      error,
    });
  }
};

const renewAccessToken = async (req: Request, res: Response) => {
  try {
    const cookieHeader = req.headers.cookie;
    let refreshToken: string | undefined;

    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string>
      );
      refreshToken = cookies.jwt;
    }

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token!',
      });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

      const accessToken = jwt.sign(
        {
          username: decoded.username,
          userId: decoded.userId,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '10m' }
      );

      return res.status(200).json({
        success: true,
        message: 'Access token renewed!',
        accessToken,
      });
    } catch (error) {
      return res.status(406).json({
        success: false,
        message: 'Unauthorized - Invalid or Expired access token!',
        error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error - Access Token renew failed!',
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
      message: 'Internal server error : Logout User',
      error,
    });
  }
};

export { registerUser, loginUser, renewAccessToken, logoutUser };
