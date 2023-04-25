import { Module } from '@nestjs/common';
import { IssuesModule } from './issues/issues.module';
import { typeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), IssuesModule],
})
export class AppModule {}
