export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  fcmToken: string;
}

export interface IUserCreateReq {
  firstName: string;
  lastName: string;
  profilePic?: string;
  fcmToken: string;
}

export interface IUserUpdateReq {}
