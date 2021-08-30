import { commands, ExtensionContext } from 'vscode';
import UserSetupService from './UserSetupService';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	const userSetup = new UserSetupService(context);

	const setupCommand = commands.registerCommand('backlog-issue-viewer.setup', () => {
		userSetup.setup();
	});

	context.subscriptions.push(setupCommand);
}