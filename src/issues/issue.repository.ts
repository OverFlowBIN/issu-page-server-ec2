import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';
import { CreateIssueDto } from './dto/create-issues.dto';
import { IssueStatus } from './issues.enum';

@CustomRepository(Issue)
export class IssueRepository extends Repository<Issue> {
  async createIssue(createIssueDto: CreateIssueDto): Promise<Issue> {
    const { title, content, author } = createIssueDto;

    const issue = this.create({
      title,
      content,
      status: IssueStatus.OPEN,
      author,
    });

    await this.save(issue);
    return issue;
  }
}
