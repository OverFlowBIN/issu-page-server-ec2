import { IsNotEmpty } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
