import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import UserService from '@/resources/user/user_service';
import Container from 'typedi';

async function addUserIfLoggedInMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const userService = Container.get(UserService);
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next();
  }
  const accessToken = bearer.split('Bearer ')[1].trim();

  try {
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    const user = await userService.getUserById(decodedToken.uid);
    if (user) {
      req.user = user;
    }
    return next();
  } catch (error) {
    return next();
  }
}

export default addUserIfLoggedInMiddleware;
