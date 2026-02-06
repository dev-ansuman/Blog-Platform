import { addUser, attachRoleToUser, getUserByUsername, getUserRoles } from '../db/queries.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import type { SQLOutputValue } from 'node:sqlite';
import { getHashedPassword } from '../helpers/getHashedPassword.js';
import { getCurrentTime } from '../helpers/getCurrentTime.js';
import { checkEmail } from '../helpers/checkEmail.js';
import { checkValidPassword } from '../helpers/checkValidPassword.js';
import { FULLNAME, USERNAME, VALIDATION, TOKEN } from '../constants/authentication.js';
import { REQUIRED } from '../constants/common.js';

const registerUserService = async (
  username: string,
  fullname: string,
  email: string,
  password: string
) => {
  if (!username || !fullname || !email || !password) {
    return {
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    };
  }

  if (username.length < 3) {
    return {
      success: false,
      message: USERNAME.ATLEAST,
    };
  }

  if (username.length > 10) {
    return {
      success: false,
      message: USERNAME.ATMOST,
    };
  }

  if (fullname.length < 3) {
    return {
      success: false,
      message: FULLNAME.ATLEAST,
    };
  }

  if (fullname.length > 30) {
    return {
      success: false,
      message: FULLNAME.ATMOST,
    };
  }

  if (!checkEmail(email)) {
    return {
      success: false,
      message: VALIDATION.INVALID_EMAIL,
    };
  }

  if (!checkValidPassword(password)) {
    return {
      success: false,
      message: VALIDATION.INVALID_PASSWORD,
    };
  }

  // hash the password before storing in DB
  const hashedPassword = await getHashedPassword(password);

  const newUser = await addUser.get(username, fullname, email, hashedPassword, getCurrentTime());

  await attachRoleToUser.get(Number(newUser!.userId), 1);

  return {
    success: true,
    message: USERNAME.CREATED,
    newUser,
  };
};

const loginUserService = async (username: string, password: string) => {
  const user = getUserByUsername.get(username);

  if (!user) {
    return {
      success: false,
      message: USERNAME.NOT_FOUND,
    };
  }

  const isPasswordValid = await bcrypt.compare(password as string, user.password as string);

  if (!isPasswordValid) {
    return {
      success: false,
      message: VALIDATION.INVALID_PASSWORD,
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
      message: TOKEN.NO_REFRESH_TOKEN,
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
      message: TOKEN.ACCESS_TOKEN_RENEWED,
      accessToken,
    };
  } catch (error) {
    return {
      success: false,
      message: TOKEN.UNAUTHORIZED,
      error,
    };
  }
};

export { registerUserService, loginUserService, renewAccessTokenService };
