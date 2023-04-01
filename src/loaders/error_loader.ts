import { Application } from 'express';
import ErrorMiddleware from '@/middlewares/error_middleware';

/**
 * Initialise the error handling middleware used by the Express application.
 *
 * @param {Application} app - Express App
 */
export const errorLoader = (app: Application): void => {
  app.use(ErrorMiddleware); // Catches and handles errors thrown by middleware or controllers.
};
