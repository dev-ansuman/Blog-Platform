import database from '../db/database.js';

const userTable = `
CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL
);
`;

const postTable = `
CREATE TABLE IF NOT EXISTS posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(userId) 
);
`;

database.exec(userTable);
database.exec(postTable);

export default database;
