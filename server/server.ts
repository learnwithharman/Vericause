import app from './src/app';
import { env } from './src/config/env';
import { logger } from './src/utils/logger';

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
