import type { Request, Response } from 'express';
import {
  addCommentService,
  addReactionService,
  createPostService,
  getCommentsService,
  getReactionsService,
  getUserPostByIdService,
  getUserPostsService,
} from '../services/blog.js';
import { REQUIRED } from '../constants/common.js';
import { POST } from '../constants/blog.js';

const createPost = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }

  const { content } = req.body;
  if (!content) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
  const userId = req.userInfo!.userId;

  const newPost = await createPostService(content, userId);

  if (newPost.success)
    return res.status(201).json({
      success: newPost.success,
      message: newPost.message,
      newPost: newPost.newPost,
    });
  else
    return res.status(newPost.httpCode).json({
      success: newPost.success,
      message: newPost.message,
    });
};

const getUserPosts = async (req: Request, res: Response) => {
  const userId = req.userInfo!.userId;
  const username = req.userInfo!.username;
  const userPosts = await getUserPostsService(userId, username);

  if (userPosts.success)
    return res.status(200).json({
      success: userPosts.success,
      message: userPosts.message,
      numberOfPosts: userPosts.numberOfPosts,
      posts: userPosts.posts,
    });
  else
    return res.status(userPosts.httpCode).json({
      success: userPosts.success,
      message: userPosts.message,
    });
};

const getUserPostById = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: POST.POST_NOT_SELECTED,
    });
  }
  const postId = Number(req.params.postId);
  const post = await getUserPostByIdService(postId);

  if (post.success)
    return res.status(200).json({
      success: post.success,
      message: post.message,
      post: post.post,
    });
  else
    return res.status(post.httpCode).json({
      success: post.success,
      message: post.message,
    });
};

const addComment = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: `${POST.POST_NOT_SELECTED} to comment!`,
    });
  }

  const postId = Number(req.params.postId);
  const userId = Number(req.userInfo!.userId);

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
  const { content } = req.body;

  const newComment = await addCommentService(content, postId, userId);
  if (newComment.success)
    return res.status(201).json({
      success: newComment.success,
      message: newComment.message,
      newComment: newComment.newComment,
    });
  else
    return res.status(newComment.httpCode).json({
      success: newComment.success,
      message: newComment.message,
    });
};

const getComments = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: `${POST.POST_NOT_SELECTED} to comment!`,
    });
  }
  const postId = Number(req.params.postId);

  const comments = await getCommentsService(postId);
  if (comments.success)
    return res.status(201).json({
      success: comments.success,
      message: comments.message,
      comments: comments.comments,
    });
  else
    return res.status(comments.httpCode).json({
      success: comments.success,
      message: comments.message,
    });
};

const addReaction = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: `${POST.POST_NOT_SELECTED} to comment!`,
    });
  }

  const postId = Number(req.params.postId);
  const userId = req.userInfo!.userId;

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: REQUIRED.REQUIRED_FIELDS,
    });
  }
  const { content } = req.body;

  const newReaction = await addReactionService(content, postId, userId);

  if (newReaction.success)
    return res.status(201).json({
      success: newReaction.success,
      message: newReaction.message,
      newReaction: newReaction.newReaction,
    });
  else
    return res.status(newReaction.httpCode).json({
      success: newReaction.success,
      message: newReaction.message,
    });
};

const getReactions = async (req: Request, res: Response) => {
  if (!req.params) {
    return res.status(400).json({
      success: false,
      message: `${POST.POST_NOT_SELECTED} to add reaction!`,
    });
  }
  const postId = Number(req.params.postId);

  const reactions = await getReactionsService(postId);

  if (reactions.success)
    return res.status(201).json({
      success: reactions.success,
      message: reactions.message,
      reactions: reactions.reactions,
    });
  else
    return res.status(reactions.httpCode).json({
      success: reactions.success,
      message: reactions.message,
    });
};

export {
  createPost,
  getUserPosts,
  getUserPostById,
  addComment,
  getComments,
  addReaction,
  getReactions,
};
