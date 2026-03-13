import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${req.method} ${req.path} - ${statusCode}: ${message}`, {
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
