import { KnapsackProAPI } from './knapsack-pro-api';
import { KnapsackProLogger } from './knapsack-pro-logger';
import { TestFile } from './models';
import { onQueueFailureType, onQueueSuccessType } from './types';

export class KnapsackProCore {
  private knapsackProAPI: KnapsackProAPI;
  private knapsackProLogger: KnapsackProLogger;

  // test files with recorded time execution
  private recordedTestFiles: TestFile[];
  // list of test files in whole user's test suite
  private allTestFiles: TestFile[];
  private isTestSuiteGreen: boolean;

  constructor(
    clientName: string,
    clientVersion: string,
    allTestFiles: TestFile[],
  ) {
    this.recordedTestFiles = [];
    this.allTestFiles = allTestFiles;

    this.knapsackProAPI = new KnapsackProAPI(clientName, clientVersion);
    this.knapsackProLogger = new KnapsackProLogger();
    this.isTestSuiteGreen = true;
  }

  public runQueueMode(
    onSuccess: onQueueSuccessType,
    onFailure: onQueueFailureType,
  ) {
    this.fetchTestsFromQueue(true, onSuccess, onFailure);
  }

  private fetchTestsFromQueue(
    initializeQueue = false,
    onSuccess: onQueueSuccessType,
    onFailure: onQueueFailureType,
  ) {
    this.knapsackProAPI
      .fetchTestsFromQueue(this.allTestFiles, initializeQueue)
      .then(response => {
        const queueTestFiles = response.data.test_files;
        const isQueueEmpty = queueTestFiles.length === 0;

        if (isQueueEmpty) {
          this.createBuildSubset(this.recordedTestFiles);
          process.exitCode = this.isTestSuiteGreen ? 0 : 1;
          return;
        }

        onSuccess(queueTestFiles).then(
          ({ recordedTestFiles, isTestSuiteGreen }) => {
            this.recordedTestFiles = this.recordedTestFiles.concat(
              recordedTestFiles,
            );
            this.isTestSuiteGreen = this.isTestSuiteGreen && isTestSuiteGreen;

            this.fetchTestsFromQueue(false, onSuccess, onFailure);
          },
        );
      })
      .catch(error => {
        onFailure(error);
        process.exitCode = 1;
      });
  }

  // saves recorded timing for tests executed on single CI node
  private createBuildSubset(testFiles: TestFile[]) {
    this.knapsackProAPI.createBuildSubset(testFiles).catch(error => {
      this.knapsackProLogger.error(
        'Could not save recorded timing of tests due to failed request to Knapsack Pro API.',
      );
    });
  }
}
