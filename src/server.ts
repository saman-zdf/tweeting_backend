import dotenv from 'dotenv';
import { app } from './app.js';
import { Logger } from './lib/common/Logger.js';
dotenv.config();

const PORT = +process.env.PORT || 8888;
app.listen(PORT, () => Logger.log(`Server running on port ${PORT}`));
