export const logger = {
  info: (message: string, context?: unknown) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, context || '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error || '');
  },
  warn: (message: string, context?: unknown) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, context || '');
  }
};
