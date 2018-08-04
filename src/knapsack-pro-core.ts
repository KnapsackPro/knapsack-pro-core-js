import { KnapsackProAPI } from './knapsack-pro-api';
import { KnapsackProLogger } from './knapsack-pro-logger';
import { TestFile } from './test-file.model';

class KnapsackProCore {
  private knapsackProAPI: KnapsackProAPI;
  private knapsackProLogger: KnapsackProLogger;

  // test files with recorded time execution
  private recordedTestFiles: TestFile[];
  // list of tests files in whole user's test suite
  private allTestFiles: TestFile[];

  constructor(allTestFiles: TestFile[]) {
    this.allTestFiles = allTestFiles;

    this.knapsackProAPI = new KnapsackProAPI();
    this.knapsackProLogger = new KnapsackProLogger();
  }

  runQueueMode(
    onSuccess: (queueTestFiles: TestFile[]) => Promise<TestFile[]>,
    onFailure: (error: any) => void
  ) {
    this.fetchTestsFromQueue(true, onSuccess, onFailure);
  }

  private fetchTestsFromQueue(
    initializeQueue = false,
    onSuccess: (queueTestFiles: TestFile[]) => Promise<TestFile[]>,
    onFailure: (error: any) => void
  ) {
    this.knapsackProAPI.fetchTestsFromQueue(this.allTestFiles, initializeQueue)
      .then(response => {
        this.knapsackProLogger.logResponse(response);

        const queueTestFiles = response.data.test_files;
        const queueEmpty = queueTestFiles.length === 0;

        if (queueEmpty) {
          this.createBuildSubset(this.recordedTestFiles);
          return;
        }

        onSuccess(queueTestFiles).then((recordedTestFiles: TestFile[]) => {
          this.recordedTestFiles.concat(recordedTestFiles);

          this.fetchTestsFromQueue(false, onSuccess, onFailure);
        });
      })
      .catch(error => {
        this.knapsackProLogger.logError(error);
        onFailure(error)
      });
  }

  // saves recorded timing for tests executed on single CI node
  private createBuildSubset(testFiles: TestFile[]) {
    this.knapsackProAPI.createBuildSubset(testFiles)
      .then(response => {
        this.knapsackProLogger.logResponse(response);
      })
      .catch(error => {
        this.knapsackProLogger.logError(error);
      });
  }
}