import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema, validateParams = false): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      if (validateParams) {
        const value = await schema.validateAsync(req.query, validationOptions);
        req.query = value;
      } else {
        const value = await schema.validateAsync(req.body, validationOptions);
        req.body = value;
      }
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(req.t(error.message));
      });
      res.status(400).send({ error: errors });
    }
  };
}

export default validationMiddleware;
