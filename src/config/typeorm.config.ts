import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'issue.ctd4pq3bfhvs.ap-northeast-2.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'dudqls12',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
