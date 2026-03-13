import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

function requiredEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    console.error(`ERROR: Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return val;
}

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  DATABASE_URL: requiredEnv('DATABASE_URL'),
  JWT_SECRET: requiredEnv('JWT_SECRET'),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret-for-dev-only',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
