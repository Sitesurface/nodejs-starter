import config from '@/config/config';
import Logger from '@/services/logger_service';
import mongoose from 'mongoose';

/**
 * Initialise the connection to the MongoDB database.
 */
export const mongooseLoader = (): void => {
  mongoose
    .connect(
      `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.path}/${config.database.dbName}?retryWrites=true&w=majority`,
    )
    .then(() => Logger.info('Database connection successful'))
    .catch(error => Logger.error(`Database connection error: ${error}`));
};
