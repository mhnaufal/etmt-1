/* eslint-disable consistent-return */
/** @Package */
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
/** @Utils */
import logger from '@src/utils/logger';
import { Pengguna } from '@src/pengguna/pengguna.entity';

/**
 * Register pengguna controller
 * NOTE: only admin can access this route & move the bcrpyt to the entity
 */
const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const email = req.body.register_email;
  const password = req.body.register_password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdPengguna = Pengguna.create({
      email,
      password: hashedPassword,
    });

    createdPengguna.save();

    res.redirect('/login');
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * Login pengguna controller
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // TODO: email & password validation

  await passport.authenticate('local', (err, pengguna, info): void => {
    if (err) return next(err);

    if (!pengguna) {
      // req.flash('success', { message: 'Successfully logged in' });
      return res.redirect('/login');
    }

    req.logIn(pengguna, (error): void => {
      if (error) return next(error);

      // req.flash('success', { message: 'You are logged in' });

      res.redirect('/dashboard');
    });
  })(req, res, next);
};

/**
 * Logout pengguna controller
 */
const logout = async (req: Request, res: Response): Promise<void> => {
  req.logOut();
  res.redirect('/');
};

export { register, login, logout };
