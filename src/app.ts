import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users.routes';

dotenv.config();

const app: Application = express();

// Settings...
app.set('port', process.env.PORT || 8585 || 3000);

// Middlewares...
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes...
const prefix = '/api/auth';
app.use(`${prefix}`, authRoutes);
app.use('/api/users', usersRoutes);

export default app;
