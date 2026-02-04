import database from '../db/database.js';

const rolesTable = `
CREATE TABLE IF NOT EXISTS roles (
    roleId INTEGER PRIMARY KEY,
    role TEXT NOT NULL UNIQUE
);
`;

database.exec(rolesTable);

export default database;
