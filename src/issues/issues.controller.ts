import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { Issue } from './issue.entity';
import { IssueStatus } from './issues.enum';
import { CreateIssueDto } from './dto/create-issues.dto';
import { IssueStatusValidationPipe } from './pipes/issue-status-validation.pipe';

@Controller('issues') // "issues" url 지정
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  /** 전체 이슈 가져오기  */
  @Get('/') // "all" url 지정
  getAllissue() {
    return this.issuesService.getAllissues();
  }

  /** 상태에 따른 이슈 가져오기 */
  @Get('/status/:status') // "all" url 지정
  getAllissueByStatus(@Param('status') status: string): Promise<Issue[]> {
    return this.issuesService.getAllissueByStatus(status);
  }

  /** 이슈 생성하기 */
  @Post('/') // @Post() 파라미터 없는 값과 동일 -> 명시적으로 작성해도 된다
  @UsePipes(ValidationPipe) // handler-level pipe 적용 시키기
  createIssue(@Body() createIssueDto: CreateIssueDto): Promise<Issue> {
    return this.issuesService.createIssue(createIssueDto);
  }

  /** ID로 특정 이슈 가져오기 */
  @Get('/id/:id')
  getIssueById(@Param('id') id: number): Promise<Issue> {
    return this.issuesService.getIssueById(id);
  }

  /** title로 특정 이슈 가져오기 */
  @Get('/title/:title')
  getIssueByTitle(@Param('title') title: string): Promise<Issue> {
    return this.issuesService.getIssueByTitle(title);
  }

  /** id로 특정 이슈 삭제하기 */
  @Delete('/id/:id')
  deleteIssueById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.issuesService.deleteIssueById(id);
  }

  /** id로 특정 이슈 status 변경하기 */
  @Patch('/status/:id')
  updateStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', IssueStatusValidationPipe) status: IssueStatus,
  ): Promise<Issue> {
    return this.issuesService.updateStatusById(id, status);
  }

  /** id로 특정 이슈 content 변경하기 */
  @Patch('/content/:id')
  updateContentById(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<Issue> {
    return this.issuesService.updateContentById(id, content);
  }

  // TODO: 제목변경 / 컨텐츠 변경 따로 API 만들기
}
