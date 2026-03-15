import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { env } from '../config/env';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['DONOR', 'NGO', 'ADMIN']),
  organizationName: z.string().optional(),
  description: z.string().optional(),
  contactInfo: z.string().optional(),
}).refine(data => {
  if (data.role === 'NGO' && !data.organizationName) return false;
  return true;
}, {
  message: "Organization name is required for NGO accounts",
  path: ["organizationName"]
});

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = registerSchema.parse(req.body);
      
      const verificationDocUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      
      const { user, accessToken, refreshToken } = await authService.register({
        ...data,
        verificationDocUrl
      });
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(201).json({ user, accessToken });
    } catch (error: unknown) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await authService.login(email, password);
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({ user, accessToken });
    } catch (error: unknown) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        res.status(401).json({ error: 'No refresh token' });
        return;
      }
      const result = await authService.verifyRefreshToken(refreshToken);
      res.json(result);
    } catch (error: unknown) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  }
};
