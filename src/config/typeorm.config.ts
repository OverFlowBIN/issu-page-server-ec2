import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '54.180.85.180',
  username: 'youngbin',
  password: 'dudqls12',
  database: 'issue',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
