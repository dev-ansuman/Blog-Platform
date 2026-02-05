import database from '../db/database.js';

const userRolesTable = `
CREATE TABLE IF NOT EXISTS userroles (
    userId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (roleId) REFERENCES roles(roleId),
    CONSTRAINT role PRIMARY KEY(userId, roleId)
);
`;

database.exec(userRolesTable);

export default database;
