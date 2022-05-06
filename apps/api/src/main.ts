import { getMongoDBClient } from './app/infra/db';
import logger from './app/infra/logger';

async function main() {
  try {
    await getMongoDBClient();
    logger.info('connected to database');
  } catch (e) {
    logger.error(e);
  }
}

main();
