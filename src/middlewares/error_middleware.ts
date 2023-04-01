import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http_exceptions';
import { Error } from 'mongoose';
import locale from '@/constants/locale_constants';
import Logger from '@/services/logger_service';

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction): void {
  Logger.error(error);
  if (error instanceof HttpException) {
    const status = error.status || 500;
    const message = error.message || locale.somethingWentWrong;
    res.status(status).send({
      status,
      message,
    });
    return;
  } else if (error instanceof Error.ValidationError) {
    const messages = Object.values(error.errors).map(err => err.message);
    res.status(400).json({
      error: messages,
    });
    return;
  } else if (error.code === 11000) {
    res.status(400).json({
      error: locale.alreadyExists,
    });
    return;
  }
  res.status(500).send({
    error: locale.somethingWentWrong,
  });
}

export default errorMiddleware;
