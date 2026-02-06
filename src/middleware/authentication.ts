import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No access token provided!',
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error : auth middleware',
      error,
    });
  }
};
