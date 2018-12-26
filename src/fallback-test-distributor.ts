import { KnapsackProEnvConfig } from './config';
import { TestFile } from './models';

export class FallbackTestDistributor {
  private allTestFiles: TestFile[];
  private executedTestFiles: TestFile[];
  private testFilesPerCiNode: TestFile[][];
  private ciNodeTotal: number;

  constructor(
    allTestFiles: TestFile[],
    executedTestFiles: TestFile[],
    ciNodeTotal: number = parseInt(KnapsackProEnvConfig.ciNodeTotal, 10),
  ) {
    this.allTestFiles = this.orderByTestPath(allTestFiles);
    this.executedTestFiles = executedTestFiles;
    this.ciNodeTotal = ciNodeTotal;
    this.testFilesPerCiNode = this.assignTestFilesPerCiNode(
      allTestFiles,
      ciNodeTotal,
    );
  }

  public testFilesForCiNode(
    ciNodeIndex: number = parseInt(KnapsackProEnvConfig.ciNodeIndex, 10),
  ): TestFile[] {
    // TODO fix below
    // return this.testFilesPerCiNode[ciNodeIndex] - this.executedTestFiles;
    return [];
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

    let nodeIndex = 0;
    allTestFiles.forEach((testFile: TestFile) => {
      testFilesPerCiNode[nodeIndex].push(testFile);

      nodeIndex += 1;
      nodeIndex = nodeIndex % ciNodeTotal;
    });

    return testFilesPerCiNode;
  }
}
