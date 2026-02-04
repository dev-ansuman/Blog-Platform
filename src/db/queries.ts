import userDatabase from '../models/User.js';
import postDatabase from '../models/Post.js';
import commentDatabase from '../models/Comment.js';
import reactionDatabase from '../models/Reaction.js';

// register user
const addUser = userDatabase.prepare(`
    INSERT INTO users (username, fullname, email, password, role, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
    RETURNING username, fullname, email, role
`);

const getUserByUsername = userDatabase.prepare(`
    SELECT * FROM users WHERE username = ?
`);

// userprofile
const getUserByUserId = userDatabase.prepare(`
    SELECT username, fullname, email FROM users WHERE userId = ?
`);

const updateUserDetailsById = userDatabase.prepare(`
    UPDATE users 
    SET username = ?, fullname = ?, email = ?, lastUpdateAt = ?
    WHERE userId = ?
    RETURNING username, fullname, email, lastUpdateAt
`);

const updateUserPasswordByUsername = userDatabase.prepare(`
    UPDATE users
    SET password = ?
    WHERE username = ?
    RETURNING username
`);

const deleteUserById = userDatabase.prepare(`
    DELETE FROM users
    WHERE userId = ?
`);

// blog - post
const addPost = postDatabase.prepare(`
    INSERT INTO posts (content, userId, createdAt)
    VALUES (?, ?, ?)
    RETURNING postId, userId, content, createdAt
`);

const getPostsByUserId = postDatabase.prepare(`
    SELECT * FROM posts
    WHERE userId = ?
`);

const getPostByPostId = postDatabase.prepare(`
    SELECT * FROM posts
    WHERE postId = ?
`);

// blog - comment
const addCommentToPost = commentDatabase.prepare(`
    INSERT INTO comments (content, postId, userId, createdAt)
    VALUES (?, ?, ?, ?)   
    RETURNING content, commentId, postId, userId, createdAt 
`);

const getCommentsByPostId = commentDatabase.prepare(`
    SELECT * FROM comments 
    WHERE postId = ?
`);

// blog - reaction
const addReactionToPost = reactionDatabase.prepare(`
    INSERT INTO reactions (content, postId, userId, createdAt)
    VALUES (?, ?, ?, ?)   
    RETURNING content, reactionId, postId, userId, createdAt 
`);

const getReactionsByPostId = reactionDatabase.prepare(`
    SELECT * FROM reactions 
    WHERE postId = ?
`);

// admin
const getAllUsers = userDatabase.prepare(`
    SELECT * FROM users
`);

// const getAllPosts = database.prepare(`
//     SELECT * FROM posts
//     `);

export {
  addUser,
  getUserByUsername,
  getUserByUserId,
  updateUserDetailsById,
  updateUserPasswordByUsername,
  deleteUserById,
  addPost,
  getPostsByUserId,
  getPostByPostId,
  addCommentToPost,
  getCommentsByPostId,
  addReactionToPost,
  getReactionsByPostId,
  getAllUsers,
};
