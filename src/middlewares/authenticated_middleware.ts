import { Request, Response, NextFunction } from 'express';
import UserModel from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http_exceptions';
import admin from 'firebase-admin';
import { IUser } from '@/resources/user/user.interface';
import IpHelper from '@/helpers/ip.helper';
import UserService from '@/resources/user/user.service';

async function authenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const userService = new UserService();
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorized'));
  }
  const accessToken = bearer.split('Bearer ')[1].trim();

  try {
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    const user = await userService.getUserById(decodedToken.uid);
    if (user) {
      req.user = user;
    } else {
      return next(new HttpException(403, 'User not registered'));
    }
    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'));
  }
}

export default authenticatedMiddleware;
