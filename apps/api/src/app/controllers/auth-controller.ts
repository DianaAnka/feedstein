import {
  ActivateEmailDTO,
  LoginUserDTO,
  RegisterUserDTO,
} from '@feedstein/api-interfaces';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user-service';
import { activateEmailSchema, registerUserSchema } from '@feedstein/validation';
import { createAccessToken, createRefreshToken } from '@feedstein/utils';
import { JWT_TOKEN_EXPIRY, SECRET_KEY } from '../config';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const registerUserDTO: RegisterUserDTO = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    await registerUserSchema.validate(registerUserDTO);
  } catch (e) {
    return res.status(400).json({
      error: {
        message: 'Invalid data',
      },
    });
  }
  try {
    const isEmailUsed = await UserService.isEmailAlreadyUsed(
      registerUserDTO.email
    );
    if (isEmailUsed)
      return res.status(409).json({
        error: {
          message: 'Email is already used',
        },
      });
    const user = await UserService.registerUser(registerUserDTO);
    res.json({
      response: {
        user,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function activateEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.body;
  const activateEmailDTO: ActivateEmailDTO = {
    token,
  };
  try {
    await activateEmailSchema.validate(activateEmailDTO);
  } catch {
    return res.status(400).json({
      error: {
        message: 'Invalid data',
      },
    });
  }
  try {
    const isActivated = await UserService.activateEmail(activateEmailDTO);
    if (!isActivated)
      return res.status(400).json({
        error: {
          message: 'Invalid activation token',
        },
      });
    return res.status(202).json({
      response: {
        message: 'User has been activated',
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const loginUserDTO: LoginUserDTO = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await UserService.getUser(loginUserDTO);
    if (!user)
      return res.status(400).json({
        error: {
          message: 'Wrong email or password',
        },
      });
    if (!UserService.isAccounActivated(user))
      return res.status(403).json({
        error: {
          message: 'User need to be activated',
        },
      });
    return res.status(403).json({
      response: {
        user,
        token: createAccessToken(
          loginUserDTO.email,
          SECRET_KEY,
          JWT_TOKEN_EXPIRY
        ),
        jwtTokenExpiry: JWT_TOKEN_EXPIRY,
      },
      cookie: createRefreshToken(loginUserDTO.email, SECRET_KEY),
    });
  } catch (e) {
    next(e);
  }
}
