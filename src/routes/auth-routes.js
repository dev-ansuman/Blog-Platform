import express from 'express';
const authRouter = express.Router();
import {addUser} from '../db/queries.js'

authRouter.post('/register', async (req, res) => {
    const {username, fullname, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Enter all required details!'
        })
    }

    try {
        const createdAt = (new Date()).toISOString()
        const newUser = addUser.get(
            username, 
            fullname,
            email,
            password,
            createdAt
        )

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            newUser
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: User Registration'
        });
    }
});

// authRouter.get('/users', (req, res) => {
//     try {
//         const users = getAllUsers.get();
//         return res.status(200).json({
//             success: true,
//             message: 'all users',
//             users
//         })
//     } catch(error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal Server Error while fetching all users'
//         })
//     }
// })

// authRouter.get('/login', (req, res) => {
//         return res.json({
//         success: true,
//         message: 'user is trying to login!'
//     })
// });
// authRouter.get('/refresh-token', (req, res) => {
//         return res.json({
//         success: true,
//         message: 'user is trying to get the refresh token!'
//     })
// });
// authRouter.get('/logout', (req, res) => {
//         return res.json({
//         success: true,
//         message: 'user is trying to logout!'
//     })
// });

export default authRouter