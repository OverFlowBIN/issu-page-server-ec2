import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  username: 'root',
  password: 'dudqls12',
  database: 'issue',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
