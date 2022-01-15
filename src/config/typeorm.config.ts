import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const dbTestConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_TEST,
  port: Number(process.env.DB_PORT_TEST),
  username: process.env.DB_USER_TEST,
  password: process.env.DB_PASS_TEST,
  database: process.env.DB_NAME_TEST,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  dropSchema: true, // drop schema makes database clean every connection
  migrations: [`${__dirname}/../migrations/*.{js,ts}`],
  migrationsRun: true,
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: `${__dirname}/../migrations`,
  },
};

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../migrations/*.{js,ts}`],
  synchronize: false,
  logging: /true/i.test(process.env.TYPEORM_LOGGING),
  cli: {
    migrationsDir: `${__dirname}/../migrations`,
  },
};

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  // console.log(dbConfig)
  return process.env.NODE_ENV === 'test' ? dbTestConfig : dbConfig;
};
