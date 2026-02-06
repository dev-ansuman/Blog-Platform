import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authentication.js';
import userRoutes from './routes/userProfile.js';
import blogRoutes from './routes/blog.js';
import adminRoutes from './routes/admin.js';
import roleRoutes from './routes/role.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import 'body-parser';

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Blog Platform',
      version: '0.1.0',
      description: 'This is RBAC based blog-platform',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // apis: ["./routes/*.ts"],
  apis: [
    // `${process.cwd()}/src/routes/*.ts`,
    `${process.cwd()}/src/swagger/*.ts`,
  ],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api', blogRoutes);
app.use('/users', adminRoutes);
app.use('/users/:userId/roles', roleRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is running on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});
