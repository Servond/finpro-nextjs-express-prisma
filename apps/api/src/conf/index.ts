import { config } from 'dotenv';
config();

export const { NODE_ENV, PORT, DATABASE_URL, API_KEY } = process.env;
