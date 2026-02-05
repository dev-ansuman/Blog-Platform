import { addUser, attachRoleToUser, getUserByUsername, getUserRoles } from '../db/queries.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import type { SQLOutputValue } from 'node:sqlite';
import { getHashedPassword } from '../helpers/getHashedPassword.js';
import { getCurrentTime } from '../helpers/getCurrentTime.js';
import { checkEmail } from '../helpers/checkEmail.js';
import { checkValidPassword } from '../helpers/checkValidPassword.js';

const registerUserService = async (
  username: string,
  fullname: string,
  email: string,
  password: string
) => {
  if (!username || !fullname || !email || !password) {
    return {
      success: false,
      message: 'Enter all required fields!',
    };
  }

  if (username.length < 3) {
    return {
      success: false,
      message: 'username should be atleast 3 characters!',
    };
  }

  if (username.length > 10) {
    return {
      success: false,
      message: 'username should be atmost 10 characters!',
    };
  }

  if (fullname.length < 3) {
    return {
      success: false,
      message: 'fullname should be atleast 3 characters!',
    };
  }

  if (fullname.length > 10) {
    return {
      success: false,
      message: 'fullname should be atmost 10 characters!',
    };
  }

  if (!checkEmail(email)) {
    return {
      success: false,
      message: 'Invalid Email Address!',
    };
  }

  if (!checkValidPassword(password)) {
    return {
      success: false,
      message: 'Invalid Password!',
    };
  }

  // hash the password before storing in DB
  const hashedPassword = await getHashedPassword(password);

  const newUser = await addUser.get(username, fullname, email, hashedPassword, getCurrentTime());

  await attachRoleToUser.get(Number(newUser!.userId), 1);

  return {
    success: true,
    message: 'User created successfully',
    newUser,
  };
};

const loginUserService = async (username: string, password: string) => {
  const user = getUserByUsername.get(username);

  if (!user) {
    return {
      success: false,
      message: 'User not found!',
    };
  }

  const isPasswordValid = await bcrypt.compare(password as string, user.password as string);

  if (!isPasswordValid) {
    return {
      success: false,
      message: 'Invalid Password!',
    };
  }

  const roles = getUserRoles.all(Number(user.userId)!);
  if (!roles) {
    throw new Error('Unable to get the user roles');
  }

  const filteredRoles = roles.map((role) => role.role);

  const accessToken = jwt.sign(
    {
      username: user.username,
      userId: user.userId,
      roles: filteredRoles,
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
      roles: filteredRoles,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );

  return {
    success: true,
    accessToken,
    refreshToken,
  };
};

const renewAccessTokenService = async (cookieHeader: string | undefined) => {
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
    return {
      success: false,
      message: 'No refresh token!',
    };
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

    const accessToken = jwt.sign(
      {
        username: decoded.username,
        userId: decoded.userId,
        roles: decoded.roles,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '10m' }
    );

    return {
      success: true,
      message: 'Access token renewed!',
      accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Unauthorized - Invalid or Expired access token!',
      error,
    };
  }
};

export { registerUserService, loginUserService, renewAccessTokenService };
