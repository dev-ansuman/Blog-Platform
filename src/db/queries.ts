import userDatabase from '../models/User.js';
import postDatabase from '../models/Post.js';
import commentDatabase from '../models/Comment.js';
import reactionDatabase from '../models/Reaction.js';
import rolesDatabase from '../models/Roles.js';
import userRolesDatabase from '../models/UserRoles.js';

// register user
const addUser = userDatabase.prepare(`
    INSERT INTO users (username, fullname, email, password, createdAt)
    VALUES (?, ?, ?, ?, ?)
    RETURNING userId, username, fullname, email
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

// role
const getRoles = rolesDatabase.prepare(`
    SELECT * FROM roles    
`);

const addRoleToDB = rolesDatabase.prepare(`
    INSERT INTO roles (role)
    VALUES (?)
    RETURNING role, roleId    
`);

const attachRoleToUser = userRolesDatabase.prepare(`
    INSERT INTO userroles (userId, roleId)
    VALUES (?, ?)
    RETURNING userId, roleId
`);

const getUserRoles = userRolesDatabase.prepare(`
   SELECT roles.role FROM roles INNER JOIN userroles ON userroles.userId = ? and userroles.roleId = roles.roleId
`);

const dettachUserRole = userRolesDatabase.prepare(`
    DELETE FROM userroles WHERE userId = ? and roleId = ?
`);

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
  getRoles,
  addRoleToDB,
  attachRoleToUser,
  getUserRoles,
  dettachUserRole,
};
