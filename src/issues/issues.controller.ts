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
  UseGuards,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { Issue } from './issue.entity';
import { IssueStatus } from './issues.enum';
import { CreateIssueDto } from './dto/create-issues.dto';
import { IssueStatusValidationPipe } from './pipes/issue-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('issues') // "issues" url 지정
@ApiTags('Issue API')
// @UseGuards(AuthGuard()) // controller level에서 UseGuards를 지정하면 모든 핸들러에 영향을 받는다. => 우선 꺼둠
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  /** 전체 Issue 가져오기  */
  @Get('/') // "all" url 지정
  @ApiOperation({
    summary: '전체 Issue 가져오기',
  })
  @ApiCreatedResponse({ type: Issue })
  getAllissue(): Promise<Issue[]> {
    return this.issuesService.getAllissues();
  }

  /** 상태에 따른 Issue 가져오기 */
  @Get('/status/:status') // "all" url 지정
  @ApiOperation({
    summary: '상태에 따른 Issue 가져오기',
  })
  @ApiCreatedResponse({ type: Issue, isArray: true })
  getAllissueByStatus(@Param('status') status: string): Promise<Issue[]> {
    return this.issuesService.getAllissueByStatus(status);
  }

  /** Issue 생성하기 */
  @Post('/') // @Post() 파라미터 없는 값과 동일 -> 명시적으로 작성해도 된다
  @ApiOperation({
    summary: 'Issue 생성하기',
  })
  @ApiCreatedResponse({
    description: 'Issue 생성하기',
    type: Issue,
    isArray: true,
  })
  @ApiBody({ type: CreateIssueDto })
  @UsePipes(ValidationPipe) // handler-level pipe 적용 시키기
  createIssue(@Body() createIssueDto: CreateIssueDto): Promise<Issue> {
    return this.issuesService.createIssue(createIssueDto);
  }

  /** id로 Issue detail 가져오기 */
  @Get('/id/:id')
  @ApiOperation({
    summary: 'id로 Issue detail 가져오기',
  })
  @ApiCreatedResponse({ description: 'id로 Issue detail 가져오기' })
  getIssueById(@Param('id') id: number): Promise<Issue> {
    return this.issuesService.getIssueById(id);
  }

  /** title로 Issue 가져오기 */
  @Get('/title/:title')
  @ApiOperation({
    summary: 'title로 Issue 가져오기',
  })
  @ApiCreatedResponse({
    description: 'title로 Issue 가져오기',
    type: Issue,
    isArray: true,
  })
  getIssueByTitle(@Param('title') title: string): Promise<Issue[]> {
    return this.issuesService.getIssueByTitle(title);
  }

  /** id로 Issue 삭제하기 */
  @Delete('/id/:id')
  @ApiOperation({
    summary: 'id로 Issue 삭제하기',
  })
  @ApiCreatedResponse({
    description: 'id로 Issue 삭제하기',
    type: Issue,
  })
  deleteIssueById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.issuesService.deleteIssueById(id);
  }

  /** id로 Issue status 변경하기 */
  @Patch('/status/:id')
  @ApiOperation({
    summary: 'id로 Issue status 변경하기',
    description: 'status: OPEN -> CLOSE / status: CLOSE -> OPEN',
  })
  @ApiCreatedResponse({
    description: 'id로 Issue status 변경하기',
    type: Issue,
  })
  updateStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', IssueStatusValidationPipe) status: IssueStatus,
  ): Promise<Issue> {
    return this.issuesService.updateStatusById(id, status);
  }

  /** id로 Issue title 변경하기 */
  @Patch('title/:id')
  @ApiOperation({
    summary: 'id로 Issue title 변경하기',
  })
  @ApiCreatedResponse({
    description: 'id로 Issue title 변경하기',
    type: Issue,
  })
  updateTitleById(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<Issue> {
    return this.issuesService.updateTitleById(id, content);
  }

  /** id로 Issue content 변경하기 */
  @Patch('/content/:id')
  @ApiOperation({
    summary: 'id로 Issue content 변경하기',
  })
  @ApiCreatedResponse({
    description: 'id로 Issue content 변경하기',
    type: Issue,
  })
  updateContentById(
    @Param('id') id: number,
    @Body('content') content: string,
  ): Promise<Issue> {
    return this.issuesService.updateTitleById(id, content);
  }
}
