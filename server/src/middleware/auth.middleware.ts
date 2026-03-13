import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
