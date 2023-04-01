import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http_exceptions';
import admin from 'firebase-admin';

async function firebaseAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorized'));
    }
    const accessToken = bearer.split('Bearer ')[1].trim();
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    if (decodedToken.uid) {
      return next();
    } else {
      return next(new HttpException(401, 'Unauthorized'));
    }
  } catch (error) {
    return next(new HttpException(500, 'Something went wrong'));
  }
}

export default firebaseAuthenticatedMiddleware;
