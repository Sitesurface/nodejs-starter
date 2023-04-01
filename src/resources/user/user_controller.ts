import { Router, Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import Controller from '@/utils/interfaces/controller_interface';
import HttpException from '@/utils/exceptions/http_exceptions';
import validationMiddleware from '@/middleware/validation_middleware';
import validate from './user_validation';
import UserService from './user_service';
import authenticated from '@/middleware/authenticated_middleware';

@Service()
class UserController implements Controller {
  public path = '/users';
  public router = Router();

  constructor(@Inject() private userService: UserService) {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      authenticated,
      validationMiddleware(validate.createUser),
      this.createUser,
    );
    this.router.get(`${this.path}/login`, authenticated, this.getUser);
    this.router.patch(`${this.path}/update`, authenticated, validationMiddleware(validate.updateUser), this.updateUser);
  }

  private createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(201).json(await this.userService.createUser(req.user._id, req.body));
    } catch (error: any) {
      next(error);
    }
  };

  private getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.userService.getUser(req.user._id, req.params.userId));
    } catch (error: any) {
      next(error);
    }
  };

  private updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.userService.updateUser(req.user._id, req.params.userId, req.body));
    } catch (error: any) {
      next(error);
    }
  };

  private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      res.status(200).json(await this.userService.deleteUser(req.user._id, req.params.userId));
    } catch (error: any) {
      next(error);
    }
  };
}

export default UserController;
