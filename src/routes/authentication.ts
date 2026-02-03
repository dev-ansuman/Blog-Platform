import express from 'express';
const authRouter = express.Router();
import {
  registerUser,
  loginUser,
  renewAccesToken,
  logoutUser,
} from '../controllers/authentication.js';

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/refresh-token', renewAccesToken);
authRouter.post('/logout', logoutUser);

export default authRouter;
