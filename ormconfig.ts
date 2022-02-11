// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm-seeding';

dotenv.config();

const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = Number(process.env.DB_PORT) || 3306;
const DB_NAME: string = process.env.DB_NAME || 'database';
const DB_USER: string = process.env.DB_USER || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['src/**/*.entity.ts', 'dist/src/**/*.entity.js'],
  seeds: ['src/**/*.seed.ts', 'dist/src/**/*.seed.js'],
  factories: ['src/**/*.factory.ts', 'dist/src/**/*.factory.js'],
  synchronize: false, // only foc local development
  logging: ['error', 'warn'],
  logger: 'advanced-console',
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default ormConfig;
