import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
dotenv.config();

export const app = express();

// Middleware
app.use(json());
app.use(cors());

// Users
app.use(router);

app.use(errorHandlerMiddleware);
