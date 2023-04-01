import UserRepository from './user_repository';
import { Inject, Service } from 'typedi';
import { IUser, IUserCreateReq, IUserUpdateReq } from './user_interface';
import HttpException from '@/utils/exceptions/http_exceptions';
import Locale from '@/constants/locale_constants';

@Service()
class UserService {
  constructor(@Inject() private userRepo: UserRepository) {}

  public async createUser(userId: string, userCreateReq: IUserCreateReq): Promise<IUser | Error> {
    const user = await this.userRepo.createUser(userId, userCreateReq);
    if (!user) throw new HttpException(500, Locale.userCreateFailed);
    return user;
  }

  public async updateUser(userId: string, userUpdateReq: IUserUpdateReq): Promise<IUser | Error> {
    const updatedUser = await this.userRepo.updateUser(userId, userUpdateReq);
    if (!updatedUser) throw new HttpException(500, Locale.userUpdateFailed);
    return updatedUser;
  }

  public async getUserById(id: string): Promise<IUser | Error> {
    return this.userRepo.getUserById(id);
  }
}

export default UserService;
