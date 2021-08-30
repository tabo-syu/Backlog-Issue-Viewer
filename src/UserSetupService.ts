import { ExtensionContext, window } from 'vscode';
import BacklogApiClient from './utils/backlogApi';

export default class UserSetupService {
  context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  async setup() {
    try {
      const domain = await this.#inputBacklogDomain();
      const apiKey = await this.#inputBacklogApiKey();
      const userId = await this.#selectBacklogUserId(domain, apiKey);
      await this.#registGlobalState(domain, apiKey, userId.toString());
    } catch (error) {
      window.showErrorMessage(error.message);
    }
  }

  async #inputBacklogDomain(): Promise<string> {
    const domain = await window.showInputBox({
      title: 'Input a Backlog domain',
      placeHolder: 'xxx.backlog.jp',
      ignoreFocusOut: true,
      value: this.context.globalState.get('domain') ?? ''
    });

    if (domain === undefined || domain === '') {
      throw new Error('Domain is a required');
    }

    return domain;
  }

  async #inputBacklogApiKey(): Promise<string> {
    const apiKey = await window.showInputBox({
      title: 'Input a Baclog API key',
      ignoreFocusOut: true,
      value: this.context.globalState.get('apiKey') ?? ''
    });

    if (apiKey === undefined || apiKey === '') {
      throw new Error('API key is a required');
    }

    return apiKey;
  }

  async #selectBacklogUserId(domain: string, apiKey: string) {
    const client = new BacklogApiClient(domain, apiKey);
    const { id } = await client.users.fetch('myself');

    return id;
  }

  async #registGlobalState(domain: string, apiKey: string, userId: string) {
    this.context.globalState.update('domain', domain);
    this.context.globalState.update('apiKey', apiKey);
    this.context.globalState.update('userId', userId);
  }
}
