import type { Request, Response, NextFunction } from 'express';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userInfo!.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Admin Permission Required!',
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
