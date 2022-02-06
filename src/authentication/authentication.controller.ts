import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import logger from '@src/utils/logger';
import { Pengguna } from '@src/pengguna/pengguna.entity';

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

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // email & password validation
  console.log(req.body);

  // eslint-disable-next-line consistent-return
  await passport.authenticate('local', (err, pengguna, info): void => {
    if (err) return next(err);

    if (!pengguna) {
      // req.flash('success', { message: 'Successfully logged in' });
      console.log(info);
      return res.redirect('/login');
    }

    // eslint-disable-next-line consistent-return
    req.logIn(pengguna, (error): void => {
      if (error) return next(error);

      // req.flash('success', { message: 'You are logged in' });

      res.redirect('/dashboard');
    });
  })(req, res, next);
};

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  req.logOut();
  res.redirect('/');
};

export { register, login, logout };
