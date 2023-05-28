import { Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { IssueRepository } from './issue.repository';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module.ts';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([IssueRepository]), AuthModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
