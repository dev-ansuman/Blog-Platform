import express from 'express';
import type { Request, Response } from 'express';
const adminRoutes = express.Router();
import { getAllUsers } from '../db/queries.js';

adminRoutes.get('/users', (req: Request, res: Response) => {
  try {
    const users = getAllUsers.all();
    if (users) {
      return res.status(200).json({
        success: true,
        message: 'all users',
        users,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'error fetching users!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error while fetching all users',
      error,
    });
  }
});

// adminRoutes.get('/posts', (req: Request, res: Response) => {
//   try {
//     const posts = getAllPosts.all();
//     if (posts) {
//       return res.status(200).json({
//         success: true,
//         message: 'all posts',
//         posts,
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: 'error fetching users!',
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Internal Server Error while fetching all users',
//       error,
//     });
//   }
// });

export default adminRoutes;
