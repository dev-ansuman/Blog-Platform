import express from 'express';
const blogRouter = express.Router();
import { authMiddleware } from '../middleware/authentication.js';
import {
  createPost,
  getUserPosts,
  getUserPostById,
  addComment,
  getComments,
  addReaction,
  getReactions,
} from '../controllers/blog.js';

blogRouter.post('/posts', authMiddleware, createPost);
blogRouter.get('/posts', authMiddleware, getUserPosts);
blogRouter.get('/posts/:postId', authMiddleware, getUserPostById);
blogRouter.post('/posts/:postId/comments', authMiddleware, addComment);
blogRouter.get('/posts/:postId/comments', authMiddleware, getComments);
blogRouter.post('/posts/:postId/reactions', authMiddleware, addReaction);
blogRouter.get('/posts/:postId/reactions', authMiddleware, getReactions);

export default blogRouter;
