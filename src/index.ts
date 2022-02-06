import path from 'path';
/** @Package */
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import { engine } from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
/** @Utils */
import { TypeormStore } from 'connect-typeorm';
import logger from '@src/utils/logger';
import ormConfig from '../ormconfig';
import { Session } from '@src/utils/Session.entity';
import HttpException from '@src/helpers/HttpException';
import passport from '@src/middlewares/passport.middleware';
import errorMiddleware from '@src/middlewares/error.middleware';
/** @Route */
import { homeRoute } from '@src/home/home.route';
import { penggunaRoute } from '@src/pengguna/pengguna.route';

dotenv.config();

const APP_NAME: string = process.env.APP_NAME || 'App';
const HOST: string = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.PORT) || 3000;
const ENV: string = process.env.ENV || 'development';

const app: Express = express();

const server = async () => {
  try {
    /** Setting up the middlewares */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    /** Setting up the view engine */
    app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
    app.set('view engine', 'hbs');
    app.set('views', path.join('views'));
    app.enable('view cache');

    /** Database */
    const db = await createConnection(ormConfig);

    /** Passport & Session */
    const sessionRepository = db.getRepository(Session);

    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'development',
        resave: false,
        saveUninitialized: false,
        store: new TypeormStore({
          cleanupLimit: 2,
          limitSubquery: false,
          ttl: 86400,
        }).connect(sessionRepository),
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    /** Method override */
    app.use(methodOverride('_method'));

    /** Routes */
    app.use(homeRoute);
    app.use(penggunaRoute);

    /** Error handler */
    app.use((req, res, next) => {
      const error = new HttpException(404, 'Not Found');
      errorMiddleware(error, req, res, next);
    });

    /** Run server */
    app.listen(PORT, HOST, () => {
      logger.info('=========================================');
      logger.info(`   🚀 App => ${APP_NAME}`);
      logger.info('=========================================');
      logger.info(`   🚀 Host => ${HOST}`);
      logger.info(`   🚀 Environment => ${ENV}`);
      logger.info(`   🚀 Port => ${PORT.toString()}`);
      logger.info('=========================================');
    });
  } catch (error) {
    logger.error(error);
    throw new Error('❌ Unable to connect to the server ❌');
  }
};

server();
