import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-43-201-154-247.ap-northeast-2.compute.amazonaws.com',
  username: 'youngbin',
  password: 'dudqls12',
  database: 'issue',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
