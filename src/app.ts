import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

import authRoutes from './routes/auth'

// settings
app.set("port", 4001)

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/api', authRoutes)

export default app;