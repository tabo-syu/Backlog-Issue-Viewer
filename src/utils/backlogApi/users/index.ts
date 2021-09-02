import BaseClient from '../BaseClient';
import { UserResponse } from '../types';

export default class Users extends BaseClient {
  constructor(private endpoint: string, private apiKey: string) {
    super(endpoint, 'users', apiKey);
  }

  async fetch(id: 'myself' | number) {
    const user = await this.get<UserResponse>(id.toString());

    return user;
  }
}
