import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty({ description: '제목', required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '내용', required: true })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '작성자', required: true })
  @IsNotEmpty()
  author: string;
}
