import fetch from 'node-fetch';
import qs from 'qs';

type Params = {
  [key: string]: string | string[] | number | number[];
};

export default class BaseClient {
  constructor(
    private endpoint: string,
    private path: string,
    private apiKey: string
  ) {}

  protected async get<T>(path: string, params?: Params): Promise<T> {
    const query = qs.stringify(
      { ...params, apiKey: this.apiKey },
      { arrayFormat: 'brackets' }
    );

    let url = `${this.endpoint}${this.path}`;
    if (path) {
      url += `/${path}`;
    }
    const request = `${url}?${query}`;
    console.log(request);
    const response = await fetch(request);

    return response.json() as Promise<T>;
  }
}
