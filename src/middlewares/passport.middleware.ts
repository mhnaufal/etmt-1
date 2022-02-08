/* eslint-disable consistent-return */
/** @Package */
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction } from 'express';
/** @Utils */
import { Pengguna } from '@src/pengguna/pengguna.entity';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, pengguna, done) => {
  done(undefined, pengguna);
});

passport.deserializeUser(async (req: Request, user: Pengguna, done: any) => {
  try {
    const pengguna = await Pengguna.findOne(user.id);
    done(undefined, pengguna);
  } catch (error) {
    done(error);
  }
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'login_email', passwordField: 'login_password' }, async (email, password, done) => {
    const pengguna = await Pengguna.findOne({ email });
    if (!pengguna) {
      return done(undefined, false, { message: 'Email tersebut belum terdaftar!' });
    }

    const isPasswordMatch = await bcrypt.compare(password, pengguna.password);
    if (isPasswordMatch) {
      done(undefined, pengguna);
    } else {
      done(undefined, false, { message: 'Password salah!' });
    }
  })
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Not Login Required middleware.
 * this middleware prevent user for accessing the login & register method if they already have session
 */
export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
};

/**
 * Authorization Required middleware.
 */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.path.split('/').slice(-1)[0];

//   const user = req.user as UserDocument;
//   if (find(user.tokens, { kind: provider })) {
//     next();
//   } else {
//     res.redirect(`/auth/${provider}`);
//   }
// };

export default passport;
