const _ = require("lodash"); // tslint:disable-line:no-var-requires

import { KnapsackProEnvConfig } from "./config";
import { TestFile } from "./models";

export class TestFallbackDistributor {
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
    this.testFilesPerCiNode = this.assignTestFilesPerCiNode(allTestFiles, ciNodeTotal);
  }

  public testFilesForCiNode(ciNodeIndex: number): TestFile[] {
    // TODO fix below
    // return this.testFilesPerCiNode[ciNodeIndex] - this.executedTestFiles
  }

  private orderByTestPath(testFiles: TestFile[]): TestFile[] {
    return _.orderBy(testFiles, ["path"]);
  }

  private assignTestFilesPerCiNode(allTestFiles: TestFile[], ciNodeTotal: number): TestFile[][] {
    const testFilesPerCiNode: TestFile[][] = [];

    for (let i = 0; i < ciNodeTotal; i++) {
      testFilesPerCiNode.push([]);
    }

    let nodeIndex: number = 0;
    allTestFiles.forEach((testFile: TestFile) => {
      testFilesPerCiNode[nodeIndex].push(testFile);

      nodeIndex = nodeIndex + 1;
      nodeIndex = nodeIndex % ciNodeTotal;
    });

    return testFilesPerCiNode;
  }
}
