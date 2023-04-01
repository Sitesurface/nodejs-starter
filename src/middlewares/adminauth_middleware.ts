import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http_exceptions';
import config from '@/config/config';
import Locales from '@/constants/locale_constants';

async function adminAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const key = req.headers.key;
  if (key === config.adminKey) {
    return next();
  } else {
    return next(new HttpException(401, Locales.unauthorized));
  }
}

export default adminAuthenticatedMiddleware;
