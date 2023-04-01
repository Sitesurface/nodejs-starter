import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import firebaseAppCheckMiddleware from '@/middlewares/firebase_app_check';

/**
 * Initialise the middleware functions used by the Express application.
 * @param {Application} app - Express App
 */
export const middlewaresLoader = (app: Application): void => {
  app.use(helmet()); // Sets various HTTP headers for security purposes.
  app.use(cors()); // Enables Cross-Origin Resource Sharing.
  app.use(morgan('dev')); // HTTP request logger middleware.
  app.use(express.json()); // Parses incoming JSON requests.
  app.use(express.urlencoded({ extended: false })); // Parses incoming URL-encoded requests.
  app.use(compression()); // Compresses HTTP response data.
  app.use(firebaseAppCheckMiddleware); // Firebase App Check
};
