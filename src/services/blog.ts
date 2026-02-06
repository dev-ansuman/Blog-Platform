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
import { ERROR, HTTP_CODES } from '../constants/common.js';

const createPostService = async (content: string, userId: number) => {
  try {
    const newPost = addPost.get(content, userId, getCurrentTime());

    return {
      success: true,
      message: POST.NEW_POST,
      newPost,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - createPost`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getUserPostsService = async (userId: number, username: string) => {
  try {
    const posts = getPostsByUserId.all(userId);
    return {
      success: true,
      message: `${username}: ${POST.POSTS_RETRIEVED}`,
      numberOfPosts: posts.length,
      posts,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserPosts`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getUserPostByIdService = async (postId: number) => {
  try {
    const post = await getPostByPostId.get(postId);
    if (!post) {
      return {
        success: false,
        message: POST.POST_NOT_FOUND,
        httpCode: HTTP_CODES.INVALID_REQUEST,
      };
    }

    return {
      success: true,
      message: POST.POSTS_RETRIEVED,
      post,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - getUserPostById`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const addCommentService = async (content: string, postId: number, userId: number) => {
  try {
    const newComment = addCommentToPost.get(content, postId, userId, getCurrentTime());
    return {
      success: true,
      message: COMMENT.NEW_COMMENT,
      newComment,
      httpCode: HTTP_CODES.CREATED,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getCommentsService = async (postId: number) => {
  try {
    const comments = getCommentsByPostId.all(postId);
    return {
      success: true,
      message: `${postId} - ${COMMENT.COMMENTS_RETRIEVED}`,
      numberOfComments: comments.length,
      comments,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const addReactionService = async (content: string, postId: number, userId: number) => {
  try {
    const newReaction = addReactionToPost.get(content, postId, userId, getCurrentTime());
    return {
      success: true,
      message: REACTION.NEW_REACTION,
      newReaction,
      httpCode: HTTP_CODES.CREATED,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addReaction`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
};

const getReactionsService = async (postId: number) => {
  try {
    const reactions = getReactionsByPostId.all(postId);
    return {
      success: true,
      message: `${postId} - ${REACTION.REACTIONS_RETRIEVED}`,
      numberOfReactions: reactions.length,
      reactions,
      httpCode: HTTP_CODES.SUCCESSFULL,
    };
  } catch (error) {
    return {
      success: false,
      message: `${ERROR.INTERNAL_SERVER} - addComment`,
      error,
      httpCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    };
  }
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
