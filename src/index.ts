import path from 'path';
/** @Package */
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
/** @Utils */
import logger from './utils/logger';
import ormConfig from '../ormconfig';
import HttpException from './utils/HttpException';
import errorMiddleware from './middlewares/error.middleware';
/** @Route */
import { homeRoute } from './home/home.route';
import { penggunaRoute } from './pengguna/pengguna.route';

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
    app.set('views', path.join(__dirname, 'views'));
    app.enable('view cache');

    /** Database */
    const db = await createConnection(ormConfig);

    /** Routes */
    app.use(homeRoute);
    app.use(penggunaRoute);

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
