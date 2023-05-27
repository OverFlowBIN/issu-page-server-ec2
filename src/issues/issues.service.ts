import { Injectable, NotFoundException } from '@nestjs/common';
import { IssueStatus } from './issues.enum';
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
    try {
      const issue = await this.issueRepository.findOneOrFail({ where: { id } });
      return issue;
    } catch (err) {
      // TODO: slack 추가하기
      throw new NotFoundException(`Can't find Issue with id ${id}`);
    }
  }

  async getIssueByTitle(title: string): Promise<Issue> {
    return this.issueRepository.findOne({ where: { title } });
  }

  async deleteIssueById(id: number) {
    const deleted = await this.issueRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Can't find Issue with id ${id}`);
    }
  }

  async updateStatusById(id: number, status: IssueStatus): Promise<Issue> {
    const issue = await this.getIssueById(id);

    issue.status = status;
    await this.issueRepository.save(issue);

    return issue;
  }

  async updateContentById(id: number, content: string): Promise<Issue> {
    const issue = await this.getIssueById(id);

    issue.content = content;
    await this.issueRepository.save(issue);

    return issue;
  }
}
