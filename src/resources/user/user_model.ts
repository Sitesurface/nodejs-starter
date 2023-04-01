import { Schema, model, Document } from 'mongoose';
import { IUser } from './user_interface';
import { defaultProfilePic } from './user_constants';

const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: defaultProfilePic,
    },
    fcmToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ _id: 1 });

export default model<IUser & Document>('User', UserSchema);
