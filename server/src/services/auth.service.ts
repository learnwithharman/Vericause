import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'DONOR' | 'NGO' | 'ADMIN';
  organizationName?: string;
  description?: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        ...(data.role === 'NGO' && data.organizationName ? {
          ngo: {
            create: {
              organizationName: data.organizationName,
              description: data.description || '',
              verificationStatus: 'PENDING',
            }
          }
        } : {})
      },
      include: {
        ngo: true
      }
    });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { ngo: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, role: user.role }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { user, accessToken, refreshToken };
  },

  verifyRefreshToken: async (token: string) => {
    try {
      const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as { id: string; role: string };
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) throw new AppError('User not found', 404);
      
      const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
      return { accessToken };
    } catch {
      throw new AppError('Invalid refresh token', 401);
    }
  }
};
