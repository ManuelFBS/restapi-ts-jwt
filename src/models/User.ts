import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: [4, 'Please enter more than 4 characters...'],
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    min: [6, 'Please enter more than 6 characters...'],
  },
});

userSchema.methods.encryptPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  const validate = await bcrypt.compare(
    password,
    this.password,
  );
  return validate;
};

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

export default model<IUser>('User', userSchema);
