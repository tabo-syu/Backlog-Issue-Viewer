import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

type Params = {
  [key: string]: string;
};

export default class BaseClient {
  endpoint: string;
  path: string;
  apiKey: string;

  constructor(endpoint: string, path: string, apiKey: string) {
    this.endpoint = endpoint;
    this.path = path;
    this.apiKey = apiKey;
  }

  protected async get<T>(path: string, params?: Params): Promise<T> {
    const query = new URLSearchParams({ apiKey: this.apiKey, ...params });

    const response = await fetch(
      `${this.endpoint}${this.path}/${path}?${query}`
    );

    return response.json() as Promise<T>;
  }
}
