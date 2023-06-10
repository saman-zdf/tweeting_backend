import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, json } from 'express';

import logger from './lib/common/Logger.js';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import router from './routes/index.js';

dotenv.config();

export const app = express();

// Middleware
app.use(json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  logger.error('Error, error');
  logger.warn('Error, error');
  logger.info('logger');

  res.status(200).json({ message: 'Hello Tweet' });
});

app.use(router);

app.use(errorHandlerMiddleware);
