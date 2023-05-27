import { Module } from '@nestjs/common';
import { IssuesModule } from './issues/issues.module';
import { typeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), IssuesModule, AuthModule],
})
export class AppModule {}
