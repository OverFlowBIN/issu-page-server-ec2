import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { IssueStatus } from '../issues.enum';

export class IssueStatusValidationPipe implements PipeTransform {
  readonly statusOptions = [IssueStatus.OPEN, IssueStatus.CLOSE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.statusOptions.indexOf(status);
    return index !== -1;
  }
}
