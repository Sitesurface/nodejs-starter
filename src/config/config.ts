import 'dotenv/config';
import validateEnv from './validate_config';

validateEnv();

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
    path: process.env.MONGO_PATH,
  },
  firebase: {
    webApiKey: process.env.FIREBASE_WEB_API_KEY,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
    enforceAppCheck: process.env.FIREBASE_APP_CHECK,
  },
  adminKey: process.env.ADMIN_KEY,
  logs: {
    level: process.env.LOG_LEVEL,
  },
  jobs: {
    jobTypes: process.env.JOB_TYPES,
    processEvery: process.env.JOB_PROCESS_EVERY,
  },
};
