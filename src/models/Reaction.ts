import database from '../db/database.js';

const reactionTable = `
CREATE TABLE IF NOT EXISTS reactions (
    reactionId INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);
`;

database.exec(reactionTable);

export default database;
