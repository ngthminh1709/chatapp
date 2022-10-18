import { Document, Schema, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    gender: {
      type: String,
      default: 'unset',
      enum: ['male', 'female', 'unset'],
    },
    phone: { type: String, default: null },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/miki-shop-dev/image/upload/v1662737253/usersAvatar/631b4aa2a1f4b4741dcecaba.jpg',
    },
    refreshToken: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export { UserSchema };

export interface User extends Document {
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  gender: string;
  avatar: string;
  refreshToken: string;
}
