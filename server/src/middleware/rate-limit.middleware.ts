import rateLimit from 'express-rate-limit';

export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10, // Strict limit for auth endpoints
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many authentication attempts, please try again after 15 minutes'
  }
});
