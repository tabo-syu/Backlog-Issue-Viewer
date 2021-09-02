import { commands, ExtensionContext, window } from 'vscode';
import UserSetupService from './UserSetupService';
import BacklogApiClient from './utils/backlogApi';
import { BacklogIssuesTreeProvider } from './BacklogIssuesTreeView';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const userSetup = new UserSetupService(context);
  const setupCommand = commands.registerCommand(
    'backlog-issue-viewer.setup',
    () => {
      userSetup.setup();
    }
  );

  const host = context.globalState.get('host');
  const apiKey = context.globalState.get('apiKey');
  if (typeof host === 'string' && typeof apiKey === 'string') {
    const client = new BacklogApiClient(host, apiKey);
    window.createTreeView('backlogIssues', {
      treeDataProvider: new BacklogIssuesTreeProvider(client),
    });
  }

  context.subscriptions.push(setupCommand);
}
