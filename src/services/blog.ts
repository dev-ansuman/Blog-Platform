import {
  addPost,
  getPostsByUserId,
  getPostByPostId,
  addCommentToPost,
  getCommentsByPostId,
  addReactionToPost,
  getReactionsByPostId,
} from '../db/queries.js';
import { getCurrentTime } from '../helpers/getCurrentTime.js';

const createPostService = async (content: string, userId: number) => {
  const newPost = addPost.get(content, userId, getCurrentTime());

  return {
    success: true,
    message: 'New Post created!',
    newPost,
  };
};
const getUserPostsService = async (userId: number, username: string) => {
  const posts = getPostsByUserId.all(userId);
  return {
    success: true,
    message: `Posts for ${username} retrieved successfully!`,
    numberOfPosts: posts.length,
    posts,
  };
};
const getUserPostByIdService = async (postId: number) => {
  const post = await getPostByPostId.get(postId);
  if (!post) {
    return {
      success: false,
      message: 'Post not found !',
    };
  }

  return {
    success: true,
    message: 'Post retrieved',
    post,
  };
};

const addCommentService = async (content: string, postId: number, userId: number) => {
  const newComment = addCommentToPost.get(content, postId, userId, getCurrentTime());
  return {
    success: true,
    message: 'Comment added !',
    newComment,
  };
};
const getCommentsService = async (postId: number) => {
  const comments = getCommentsByPostId.all(postId);
  return {
    success: true,
    message: `Comments for postId: ${postId} retrieved successfully!`,
    numberOfComments: comments.length,
    comments,
  };
};
const addReactionService = async (content: string, postId: number, userId: number) => {
  const newReaction = addReactionToPost.get(content, postId, userId, getCurrentTime());
  return {
    success: true,
    message: 'Reacted!',
    newReaction,
  };
};

const getReactionsService = async (postId: number) => {
  const reactions = getReactionsByPostId.all(postId);
  return {
    success: true,
    message: `Reactions for postId: ${postId} retrieved successfully!`,
    numberOfReactions: reactions.length,
    reactions,
  };
};

export {
  createPostService,
  getUserPostsService,
  getUserPostByIdService,
  addCommentService,
  getCommentsService,
  addReactionService,
  getReactionsService,
};
