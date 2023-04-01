import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http_exceptions';
import admin from 'firebase-admin';
import config from '@/config/config';
import Locales from '@/constants/locale_constants';
import Logger from '@/services/logger_service';

async function firebaseAppCheckMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  if (!config.firebase.enforceAppCheck) return next();

  const appCheckToken = req.header('X-Firebase-AppCheck');

  if (!appCheckToken) return next(new HttpException(401, Locales.unauthorized));

  try {
    await admin.appCheck().verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware
    // function in the stack.
    return next();
  } catch (err) {
    Logger.alert('Firebase App Check failed !!!');
    return next(new HttpException(401, Locales.unauthorized));
  }
}

export default firebaseAppCheckMiddleware;
