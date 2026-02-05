import type { Request, Response, NextFunction } from 'express';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userInfo!.roles.includes('admin')) {
      return res.status(401).json({
        success: false,
        message: 'Super Admin Permission Required!',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error : adminMiddleware',
      error,
    });
  }
};

export { adminMiddleware };
