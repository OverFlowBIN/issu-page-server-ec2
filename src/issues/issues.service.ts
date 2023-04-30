import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IssueStatus } from './issues.enum';
import { v1 as uuid } from 'uuid';
import { CreateIssueDto } from './dto/create-issues.dto';
import { IssueRepository } from './issue.repository';
import { Issue } from './issue.entity';

@Injectable()
export class IssuesService {
  constructor(private issueRepository: IssueRepository) {}

  getAllissues() {
    return this.issueRepository.find();
  }

  getAllissueByStatus(status: string): Promise<Issue[]> {
    if (status === 'open') {
      return this.issueRepository.find({ where: { status: IssueStatus.OPEN } });
    } else if (status === 'close') {
      return this.issueRepository.find({
        where: { status: IssueStatus.CLOSE },
      });
    }
  }

  async createIssue(createIssueDto: CreateIssueDto): Promise<Issue> {
    // Service에서 DB를 제어하는 로직은 Repository로 옮긴다
    return this.issueRepository.createIssue(createIssueDto);
  }

  async getIssueById(id: number): Promise<Issue> {
    const issue = await this.issueRepository.findOne({ where: { id } });
    if (!issue) throw new NotFoundException(`Can't find Issue with id ${id}`);
    return issue;
  }

  // getIssueByTitle(title: string): Issue {
  //   return this.issueRepository.find((issue) => issue.title.includes(title));
  // }

  // deleteIssueById(id: string): Issue[] {
  //   const issue = this.getIssueById(id);
  //   if (!issue) throw new NotFoundException(`Can't find Issue with id ${id}`);
  //   return this.issues.filter((issue) => issue.id !== id);
  // }

  // updateStatusById(id: string, status: IssueStatus): Issue {
  //   const issue = this.getIssueById(id);
  //   issue.status = status;
  //   return issue;
  // }

  // updateContentById(id: string, content: string): Issue {
  //   const issue = this.getIssueById(id);
  //   issue.content = content;
  //   return issue;
  // }
}
