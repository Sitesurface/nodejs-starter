import { cleanEnv, str, port, bool } from 'envalid';

/**
 * Validates the application's environment variables using the envalid library.
 */
function validateEnv(): void {
  // Define the schema object that defines the expected variables and their validation rules.
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    PORT: port({ default: 3000 }),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    MONGO_PASSWORD: str(),
    MONGO_DB_NAME: str(),
    ADMIN_KEY: str(),
    LOG_LEVEL: str(),
    JOB_PROCESS_EVERY: str(),
    FIREBASE_WEB_API_KEY: str(),
    FIREBASE_STORAGE_BUCKET: str(),
    FIREBASE_SERVICE_ACCOUNT: str(),
    FIREBASE_APP_CHECK: bool(),
  });
}

export default validateEnv;
