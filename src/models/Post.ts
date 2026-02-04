import database from '../db/database.js';

const postTable = `
CREATE TABLE IF NOT EXISTS posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId), 
    createdAt TEXT NOT NULL,
);
`;

database.exec(postTable);
export default database;
