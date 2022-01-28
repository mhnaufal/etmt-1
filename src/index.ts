import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import ormConfig from '../ormconfig';
import errorMiddleware from './middlewares/error.middleware';
import { penggunaRoute } from './pengguna/pengguna.route';
import logger from './utils/logger';

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

    /** Database */
    const db = await createConnection(ormConfig);

    /** Routes */
    app.use(penggunaRoute);

    app.use('/', (req, res) => {
      logger.info(req.ip);
      res.send({ status: 'SUCCESS' });
    });

    app.use(errorMiddleware);

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
