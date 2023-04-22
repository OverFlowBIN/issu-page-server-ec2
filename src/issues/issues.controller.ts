import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { Issue } from './issues.model';
import { CreateIssueDto } from './dto/create-issues.dto';

@Controller('issues') // "issues" url 지정
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  /** 전체 이슈 가져오기  */
  @Get('/') // "all" url 지정
  getAllissue(): Issue[] {
    return this.issuesService.getAllissues();
  }

  /** 상태에 따른 이슈 가져오기 */
  @Get('/status/:status') // "all" url 지정
  getAllissueByStatus(@Param('status') status: string): Issue[] {
    return this.issuesService.getAllissueByStatus(status);
  }

  /** 이슈 생성하기 */
  @Post('/') // @Post() 파라미터 없는 값과 동일 -> 명시적으로 작성해도 된다
  createIssue(@Body() createIssueDto: CreateIssueDto): Issue {
    return this.issuesService.createIssue(createIssueDto);
  }

  /** ID로 특정 이슈 가져오기 */
  @Get('/id/:id')
  getIssueById(@Param('id') id: string): Issue {
    return this.issuesService.getIssueById(id);
  }

  /** title로 특정 이슈 가져오기 */
  @Get('/title/:title')
  getIssueByTitle(@Param('title') title: string): Issue {
    return this.issuesService.getIssueByTitle(title);
  }

  /** id로 특정 이슈 삭제하기 */
  @Delete('/id/:id')
  deleteIssueById(@Param('id') id: string): Issue[] {
    return this.issuesService.deleteIssueById(id);
  }

  /** id로 특정 이슈 status 변경하기 */
  @Patch('/status/:id')
  updateStatusById(@Param('id') id: string): Issue {
    return this.issuesService.updateStatusById(id);
  }

  /** id로 특정 이슈 content 변경하기 */
  @Patch('/content/:id')
  updateContentById(@Param('id') id: string, @Body('content') content: string) {
    return this.issuesService.updateContentById(id, content);
  }
}
