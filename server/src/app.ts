import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.routes';
import campaignRoutes from './routes/campaign.routes';
import donationRoutes from './routes/donation.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/error.middleware';
import { standardLimiter, authLimiter } from './middleware/rate-limit.middleware';

const app = express();

// Static files for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Middleware
app.use(cors({
  origin: true, // In production, replace with specific domain
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(standardLimiter);

// Specific limit for auth
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

export default app;
