import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authentication.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user-profile.js';

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
