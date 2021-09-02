import BaseClient from '../BaseClient';
import { IssueResponse } from '../types';

type Sort =
  | 'issueType'
  | 'category'
  | 'version'
  | 'milestone'
  | 'summary'
  | 'status'
  | 'priority'
  | 'attachment'
  | 'sharedFile'
  | 'created'
  | 'createdUser'
  | 'updated'
  | 'updatedUser'
  | 'assignee'
  | 'startDate'
  | 'dueDate'
  | 'estimatedHours'
  | 'actualHours'
  | 'childIssue';

type Order = 'asc' | 'desc';

type Request = {
  id?: number | number[];
  statusId?: number | number[];
  assigneeId?: number | number[];
  sort?: Sort;
  order?: Order;
};

export default class Issues extends BaseClient {
  constructor(endpoint: string, apiKey: string) {
    super(endpoint, 'issues', apiKey);
  }

  async fetch(param: Request) {
    const issue = await this.get<IssueResponse[]>('', param);

    return issue;
  }
}
