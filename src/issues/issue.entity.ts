import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IssueStatus } from './issues.enum';

@Entity()
export class Issue extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: IssueStatus;
}
