import { Module } from '@nestjs/common';
import { IssuesModule } from './issues/issues.module';
import { typeORMConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './decorator/typeorm-ex.module.ts';
import { IssuesController } from './issues/issues.controller';
import { IssuesService } from './issues/issues.service';
import { IssueRepository } from './issues/issue.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), IssuesModule],
})
export class AppModule {}
