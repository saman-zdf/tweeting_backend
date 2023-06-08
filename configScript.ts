import dotenv from 'dotenv';

dotenv.config();

export const $DB_PASS = process.env.MYSQL_ROOT_PASSWORD;
