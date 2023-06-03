import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IssueStatus } from './issues.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Issue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '이슈 상태 (OPNE | CLOSE)' })
  @Column()
  status: IssueStatus;

  @ApiProperty({ description: '작성자' })
  @Column()
  author: string;

  @ApiProperty({ description: '작성시간' })
  @Column()
  createdAt: Date;

  @ApiProperty({ description: '수정시간' })
  @Column()
  updatedAt: Date;
}
