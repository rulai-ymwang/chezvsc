import {
  DocumentFormattingEditProvider,
  TextDocument,
  TextEdit,
  ProviderResult,
  CancellationToken,
  FormattingOptions,
  Position,
  Range,
  window,
} from 'vscode';

import * as fs from 'fs';

import { spawnSync } from 'child_process';

export class SchemeFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken,
  ): ProviderResult<TextEdit[]> {
    return [TextEdit.replace(this.getFullDocRange(document), this.pretty(document.getText()))];
  }

  private getFullDocRange(document: TextDocument): Range {
    return document.validateRange(
      new Range(new Position(0, 0), new Position(Number.MAX_VALUE, Number.MAX_VALUE)),
    );
  }

  private pretty(text: string): string {
    const tmpInFileName = `${require('os').tmpdir()}/${new Date().getTime().toString(36) +
      Math.random()
        .toString(36)
        .slice(2)}-i.ss`;

    const tmpOutFileName = `${require('os').tmpdir()}/${new Date().getTime().toString(36) +
      Math.random()
        .toString(36)
        .slice(2)}-o.ss`;

    fs.writeFileSync(tmpInFileName, text);

    try {
      spawnSync('sh', [
        '-c',
        `echo '(pretty-file "${tmpInFileName}" "${tmpOutFileName}")' | chez -q`,
      ]);

      return fs.readFileSync(tmpOutFileName).toString();
    } catch (err) {
      window.showInformationMessage('Error occurred when formatting!');
    }

    return text;
  }
}
