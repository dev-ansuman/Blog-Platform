import database from "../db/database.js";

const reactionTable = `
CREATE TABLE IF NOT EXISTS reactions (
    reactionId INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL
);
`;

database.exec(reactionTable);
export default database;