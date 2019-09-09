import * as vscode from 'vscode';
import { SchemeFormatter } from './schemeformatter';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "chezvsc" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.formatscheme', () => {
      vscode.commands.executeCommand('workbench.action.files.save');
    }),
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('scheme', new SchemeFormatter()),
  );
}

export function deactivate() {}
