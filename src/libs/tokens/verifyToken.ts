import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

dotenv.config();

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json('Access denied');

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY_TOKEN || 'tokentest',
    ) as IPayload;

    // Check if the token has expired...
    if (Date.now() >= payload.exp * 1000) {
      return res
        .status(401)
        .json(
          'Your session has expired. You must log in again...',
        );
    }

    req.userId = payload._id;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json(
          'Your session has expired. You must log in again...',
        );
    } else {
      return res.status(401).json('Invalid token...!');
    }
  }
};
