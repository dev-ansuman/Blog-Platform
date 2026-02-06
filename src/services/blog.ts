import { COMMENT, POST, REACTION } from '../constants/blog.js';
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
    message: POST.NEW_POST,
    newPost,
  };
};
const getUserPostsService = async (userId: number, username: string) => {
  const posts = getPostsByUserId.all(userId);
  return {
    success: true,
    message: `${username}: ${POST.POSTS_RETRIEVED}`,
    numberOfPosts: posts.length,
    posts,
  };
};
const getUserPostByIdService = async (postId: number) => {
  const post = await getPostByPostId.get(postId);
  if (!post) {
    return {
      success: false,
      message: POST.POST_NOT_FOUND,
    };
  }

  return {
    success: true,
    message: POST.POSTS_RETRIEVED,
    post,
  };
};

const addCommentService = async (content: string, postId: number, userId: number) => {
  const newComment = addCommentToPost.get(content, postId, userId, getCurrentTime());
  return {
    success: true,
    message: COMMENT.NEW_COMMENT,
    newComment,
  };
};
const getCommentsService = async (postId: number) => {
  const comments = getCommentsByPostId.all(postId);
  return {
    success: true,
    message: `${postId} - ${COMMENT.COMMENTS_RETRIEVED}`,
    numberOfComments: comments.length,
    comments,
  };
};
const addReactionService = async (content: string, postId: number, userId: number) => {
  const newReaction = addReactionToPost.get(content, postId, userId, getCurrentTime());
  return {
    success: true,
    message: REACTION.NEW_REACTION,
    newReaction,
  };
};

const getReactionsService = async (postId: number) => {
  const reactions = getReactionsByPostId.all(postId);
  return {
    success: true,
    message: `${postId} - ${REACTION.REACTIONS_RETRIEVED}`,
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
