import { decodeAccessToken } from '@feedstein/utils';
import { NextFunction, Request, Response } from 'express';
import { SECRET_KEY } from '../config';
import UserService from '../services/user-service';

export const addUserIdentity = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    const { email } = await decodeAccessToken(token, SECRET_KEY);
    const user = await UserService.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token ' });
  }
};
