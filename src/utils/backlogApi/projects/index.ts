import BaseClient from '../BaseClient';
import { ProjectResponse, StatusResponse } from '../types';

export default class Projects extends BaseClient {
  constructor(endpoint: string, apiKey: string) {
    super(endpoint, 'projects', apiKey);
  }

  async fetch() {
    const projects = await this.get<ProjectResponse[]>('');

    return projects;
  }

  async statuses(projectIdOrKey: string) {
    const statuses = await this.get<StatusResponse[]>(
      `${projectIdOrKey}/statuses`
    );

    return statuses;
  }
}
