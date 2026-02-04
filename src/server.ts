import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authentication.js';
import userRoutes from './routes/user-profile.js';
import blogRoutes from './routes/blog.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api', blogRoutes);
app.use('/users', adminRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
