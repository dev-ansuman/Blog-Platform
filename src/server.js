import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth-routes.js';
import adminRoutes from './routes/admin-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
