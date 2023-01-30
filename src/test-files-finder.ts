import { KnapsackProEnvConfig } from './config';
import { TestFile } from './models';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export class TestFilesFinder {
  public static testFilesFromSourceFile(): TestFile[] {
    if (!KnapsackProEnvConfig.testFileListSourceFile) {
      return null;
    }

    const allFileContents = fs.readFileSync(
      KnapsackProEnvConfig.testFileListSourceFile,
      'utf-8',
    );

    const testFiles: TestFile[] = [];

    allFileContents.split(/\r?\n/).forEach((line: string) => {
      const testFilePath: string = line.trim();

      if (testFilePath.length === 0) {
        return;
      }

      testFiles.push({
        path: testFilePath,
      });
    });

    return testFiles;
  }
}
