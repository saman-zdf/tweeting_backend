import dotenv from 'dotenv';
import { app } from './app.js';
import logger from './lib/common/Logger.js';
dotenv.config();

const PORT = Number(process.env.PORT) || 8888;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
