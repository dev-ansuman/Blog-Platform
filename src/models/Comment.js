import database from "../db/database.js";

const commentTable = `
CREATE TABLE IF NOT EXISTS comments (
    commentId INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL
);
`;

database.exec(commentTable);
export default database;