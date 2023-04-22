export interface Issue {
  id: string;
  title: string;
  content: string;
  status: IssueStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum IssueStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}
