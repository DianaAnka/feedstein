import app from './app';
import { PORT } from './app/config';
import { getMongoDBClient } from './app/infra/db';
import logger from './app/infra/logger';

async function main() {
  try {
    await getMongoDBClient();
    logger.info('connected to database');
    app.listen(PORT, () => {
      logger.info(`App is listening on port ${PORT}`);
    });
  } catch (e) {
    logger.error(e);
  }
}

main();
