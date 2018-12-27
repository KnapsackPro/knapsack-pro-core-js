import { KnapsackProEnvConfig } from './config';
import { TestFile } from './models';

export class FallbackTestDistributor {
  private allTestFiles: TestFile[];
  private executedTestFilePaths: string[];
  private testFilesPerCiNode: TestFile[][];
  private ciNodeTotal: number;

  constructor(
    allTestFiles: TestFile[],
    executedTestFiles: TestFile[],
    ciNodeTotal: number = parseInt(KnapsackProEnvConfig.ciNodeTotal, 10),
  ) {
    this.allTestFiles = this.orderByTestPath(allTestFiles);
    this.executedTestFilePaths = executedTestFiles.map(
      testFile => testFile.path,
    );
    this.ciNodeTotal = ciNodeTotal;
    this.testFilesPerCiNode = this.assignTestFilesPerCiNode(
      allTestFiles,
      ciNodeTotal,
    );
  }

  public testFilesForCiNode(
    ciNodeIndex: number = parseInt(KnapsackProEnvConfig.ciNodeIndex, 10),
  ): TestFile[] {
    return this.testFilesPerCiNode[ciNodeIndex].filter(testFile => {
      return !this.executedTestFilePaths.includes(testFile.path);
    });
  }

  private orderByTestPath(testFiles: TestFile[]): TestFile[] {
    const sortBy = (key: string) => {
      return (a: any, b: any) =>
        a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
    };

    return testFiles.sort(sortBy('path'));
  }

  private assignTestFilesPerCiNode(
    allTestFiles: TestFile[],
    ciNodeTotal: number,
  ): TestFile[][] {
    const testFilesPerCiNode: TestFile[][] = Array.from(
      { length: ciNodeTotal },
      () => [],
    );

    allTestFiles.forEach((testFile: TestFile, index: number) =>
      testFilesPerCiNode[index % ciNodeTotal].push(testFile),
    );

    return testFilesPerCiNode;
  }
}
