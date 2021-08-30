import Users from "./users";
// import Issues from "./issues";

export default class BacklogApiClient {
  endpoint: string;
  apiKey: string;

  users: Users;
  // issues: Issues;

  constructor(domain: string, apiKey: string) {
    this.endpoint = `https://${domain}/api/v2/`;
    this.apiKey = apiKey;

    this.users = new Users(this.endpoint, this.apiKey);
    // this.issues = new Issues(this.endpoint, this.apiKey);
  }
}