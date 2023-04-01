import { Service } from 'typedi';
import { IUser, IUserCreateReq, IUserUpdateReq } from './user_interface';
import UserModel from './user_model';

@Service()
class UserRepository {
  private userModel = UserModel;

  public async createUser(userId: string, data: IUserCreateReq): Promise<IUser | Error> {
    return this.userModel.create({ _id: userId, ...data });
  }

  public async getUser(userId: string): Promise<IUser | Error| null> {
    return this.userModel.findOne({
      _id: userId,
    });
  }

  public async updateUser(userId: string, data: IUserUpdateReq): Promise<IUser | Error| null> {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      data,
      { new: true },
    );
  }
}

export default UserRepository;
