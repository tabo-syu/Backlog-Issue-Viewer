import BaseClient from "../BaseClient";
import { UserResponse } from "../types";

export default class Users extends BaseClient {
  constructor(endpoint: string, apiKey: string) {
    super(endpoint, 'users', apiKey);
  }

  async fetch(id: 'myself' | string) {
    const user = id === 'myself' ? await this.get<UserResponse>('myself') : await this.get<UserResponse>(id);

    return user;
  }
}