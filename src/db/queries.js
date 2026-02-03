import database from '../models/User.js'

const addUser = database.prepare(`
    INSERT INTO users (username, fullname, email, password, createdAt)
    VALUES (?, ?, ?, ?, ?)
    RETURNING username, fullname, email
    `);

const getAllUsers = database.prepare(`
    SELECT * FROM users
    `)

export {addUser, getAllUsers};