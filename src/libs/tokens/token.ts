import { IUser } from 'models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const token = (savedUser: IUser): string => {
  const token = jwt.sign(
    { _id: savedUser._id },
    process.env.SECRET_KEY_TOKEN || 'tokentest',
    { expiresIn: '12h' },
  );

  return token;
};
