import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import User from '../../models/User';

export const getAllUsers = async (
  req: Request,
  res: Response,
) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserByUserNameOrEmail = async (
  req: Request,
  res: Response,
) => {
  const { username, email } = req.body;
  let user = null;

  try {
    if (username) {
      user = await User.findOne({ username: username });
    } else if (email) {
      user = await User.findOne({ email: email });
    } else {
      return res.status(404).json('User not found...!');
    }

    let noPassword = null;
    if (user) {
      const { password: _, ...userWithoutPassword } =
        user.toObject();
      noPassword = userWithoutPassword;
    }

    return res.status(200).json(noPassword);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
) => {
  //
};

export const deleteUser = async (
  req: Request,
  res: Response,
) => {
  //
};
