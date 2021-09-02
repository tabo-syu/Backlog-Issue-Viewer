import { ExtensionContext, window } from 'vscode';

export default class UserSetupService {
  constructor(private context: ExtensionContext) {}

  async setup() {
    try {
      const host = await this.inputBacklogHost();
      const apiKey = await this.inputBacklogApiKey();
      await this.registGlobalState(host, apiKey);
    } catch (error) {
      //@ts-ignore
      window.showErrorMessage(error.message);
    }
  }

  private async inputBacklogHost(): Promise<string> {
    const host = await window.showInputBox({
      title: 'Input a Backlog host',
      placeHolder: 'xxx.backlog.jp',
      ignoreFocusOut: true,
      value: this.context.globalState.get('host') ?? '',
    });

    if (host === undefined || host === '') {
      throw new Error('Host is a required');
    }

    return host;
  }

  private async inputBacklogApiKey(): Promise<string> {
    const apiKey = await window.showInputBox({
      title: 'Input a Baclog API key',
      ignoreFocusOut: true,
      value: this.context.globalState.get('apiKey') ?? '',
    });

    if (apiKey === undefined || apiKey === '') {
      throw new Error('API key is a required');
    }

    return apiKey;
  }

  private async registGlobalState(host: string, apiKey: string) {
    this.context.globalState.update('host', host);
    this.context.globalState.update('apiKey', apiKey);
  }
}
