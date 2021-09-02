import Users from './users';
import Issues from './issues';
import Projects from './projects';

export default class BacklogApiClient {
  private endpoint: string;

  public users: Users;
  public issues: Issues;
  public projects: Projects;

  constructor(private host: string, private apiKey: string) {
    this.endpoint = `https://${this.host}/api/v2/`;

    this.users = new Users(this.endpoint, this.apiKey);
    this.issues = new Issues(this.endpoint, this.apiKey);
    this.projects = new Projects(this.endpoint, this.apiKey);
  }
}
