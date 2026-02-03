import database from '../models/User.js';

const addUser = database.prepare(`
    INSERT INTO users (username, fullname, email, password, createdAt)
    VALUES (?, ?, ?, ?, ?)
    RETURNING username, fullname, email
    `);

const getUserByUsername = database.prepare(`
    SELECT * FROM users WHERE username = ?
    `);

const addPost = database.prepare(`
    INSERT INTO posts (content, createdAt)
    VALUES (?, ?)
    RETURNING postId, createdAt, userId
    `);

const getAllUsers = database.prepare(`
    SELECT * FROM users
    `);

const getAllPosts = database.prepare(`
    SELECT * FROM posts
    `);

export { addUser, getUserByUsername, getAllUsers, getAllPosts, addPost };
