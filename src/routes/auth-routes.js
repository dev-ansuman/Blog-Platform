import express from 'express';
const authRouter = express.Router();
import { registerUser, loginUser } from '../controllers/auth-controller.js';


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

// authRouter.post('/post', async (req, res) => {
//     const {content} = req.body;

//     if(!content) {
//         return res.status(400).json({
//             success: false,
//             message: 'Enter post content!'
//         })
//     }

//     try {
//         const createdAt = (new Date()).toISOString()
//         const newPost = addPost.get(
//             content,
//             createdAt
//         )

//         return res.status(201).json({
//             success: true,
//             message: 'Post added successfully',
//             newPost
//         })
//     } catch(error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal Server Error: Post generation'
//         });
//     }
// });

export default authRouter