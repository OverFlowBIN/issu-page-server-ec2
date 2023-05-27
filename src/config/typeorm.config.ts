import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ybmacpro',
  password: 'dudqls12',
  database: 'issue',
  schema: 'issue-schema',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
