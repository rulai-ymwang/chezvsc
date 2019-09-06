import { DocumentFormattingEditProvider } from 'vscode';

export class SchemeFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: import('vscode').TextDocument,
    options: import('vscode').FormattingOptions,
    token: import('vscode').CancellationToken,
  ): import('vscode').ProviderResult<import('vscode').TextEdit[]> {
    document.fileName;
    throw new Error('Method not implemented.');
  }
}
