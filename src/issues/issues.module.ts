import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { IssueRepository } from './issue.repository';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module.ts';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([IssueRepository])],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
