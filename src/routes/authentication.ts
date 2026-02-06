import express from 'express';
const authRouter = express.Router();
import {
  registerUser,
  loginUser,
  renewAccessToken,
  logoutUser,
} from '../controllers/authentication.js';

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/refresh-token', renewAccessToken);
authRouter.post('/logout', logoutUser);

export default authRouter;
