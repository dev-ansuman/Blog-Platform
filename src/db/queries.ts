import database from '../models/User.js';

const addUser = database.prepare(`
    INSERT INTO users (username, fullname, email, password, createdAt)
    VALUES (?, ?, ?, ?, ?)
    RETURNING username, fullname, email
    `);

const getUserByUsername = database.prepare(`
    SELECT * FROM users WHERE username = ?
    `);

const getUserByUserId = database.prepare(`
    SELECT username, fullname, email FROM users WHERE userId = ?
    `);

const updateUserDetailsById = database.prepare(`
    UPDATE users 
    SET username = ?, fullname = ?, email = ?, lastUpdateAt = ?
    WHERE userId = ?
    RETURNING username, fullname, email, lastUpdateAt
    `);

const updateUserPasswordByUsername = database.prepare(`
        UPDATE users
        SET password = ?
        WHERE username = ?
        RETURNING username
        `);

const deleteUserById = database.prepare(`
            DELETE FROM users
            WHERE userId = ?
            `);

// const addPost = database.prepare(`
//     INSERT INTO posts (content, createdAt)
//     VALUES (?, ?)
//     RETURNING postId, createdAt, userId
//     `);

const getAllUsers = database.prepare(`
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
  getAllUsers,
};
