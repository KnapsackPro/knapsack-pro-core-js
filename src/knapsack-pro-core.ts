import { KnapsackProAPI } from "./knapsack-pro-api";
import { KnapsackProLogger } from "./knapsack-pro-logger";
import { TestFile } from "./test-file.model";

type onQueueSuccessType = (queueTestFiles: TestFile[]) => Promise<TestFile[]>;
type onQueueFailureType = (error: any) => void;

export class KnapsackProCore {
  private knapsackProAPI: KnapsackProAPI;
  private knapsackProLogger: KnapsackProLogger;

  // test files with recorded time execution
  private recordedTestFiles: TestFile[];
  // list of tests files in whole user's test suite
  private allTestFiles: TestFile[];

  constructor(allTestFiles: TestFile[]) {
    this.recordedTestFiles = [];
    this.allTestFiles = allTestFiles;

    this.knapsackProAPI = new KnapsackProAPI();
    this.knapsackProLogger = new KnapsackProLogger();
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
    this.knapsackProAPI.fetchTestsFromQueue(this.allTestFiles, initializeQueue)
      .then((response) => {
        this.knapsackProLogger.logResponse(response);

        const queueTestFiles = response.data.test_files;

        // when queue is empty
        if (queueTestFiles.length === 0) {
          this.createBuildSubset(this.recordedTestFiles);
          return;
        }

        onSuccess(queueTestFiles).then((recordedTestFiles: TestFile[]) => {
          this.recordedTestFiles.concat(recordedTestFiles);

          this.fetchTestsFromQueue(false, onSuccess, onFailure);
        });
      })
      .catch((error) => {
        this.knapsackProLogger.logError(error);
        onFailure(error);
      });
  }

  // saves recorded timing for tests executed on single CI node
  private createBuildSubset(testFiles: TestFile[]) {
    this.knapsackProAPI.createBuildSubset(testFiles)
      .then((response) => {
        this.knapsackProLogger.logResponse(response);
      })
      .catch((error) => {
        this.knapsackProLogger.logError(error);
      });
  }
}
