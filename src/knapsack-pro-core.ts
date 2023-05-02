import { createHash } from 'node:crypto';
import { KnapsackProAPI } from './knapsack-pro-api';
import { QueueApiResponseCodes } from './api-response-codes';
import { KnapsackProLogger } from './knapsack-pro-logger';
import { FallbackTestDistributor } from './fallback-test-distributor';
import { TestFilesFinder } from './test-files-finder';
import { TestFile } from './models';
import {
  onQueueFailureType,
  onQueueSuccessType,
  testFilesToExecuteType,
} from './types';

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
    testFilesToExecute: testFilesToExecuteType,
  ) {
    this.recordedTestFiles = [];
    this.allTestFiles =
      TestFilesFinder.testFilesFromSourceFile() ?? testFilesToExecute();

    this.knapsackProAPI = new KnapsackProAPI(clientName, clientVersion);
    this.knapsackProLogger = new KnapsackProLogger();
    this.isTestSuiteGreen = true;
  }

  public runQueueMode(
    onSuccess: onQueueSuccessType,
    onFailure: onQueueFailureType,
  ) {
    const val = this.sha256('test');
    this.knapsackProLogger.info('### TEST 2');
    this.knapsackProLogger.info(val);
    this.fetchTestsFromQueue(true, true, onSuccess, onFailure);
  }

  private fetchTestsFromQueue(
    // eslint-disable-next-line default-param-last
    initializeQueue = false,
    // eslint-disable-next-line default-param-last
    attemptConnectToQueue = false,
    onSuccess: onQueueSuccessType,
    onFailure: onQueueFailureType,
  ) {
    this.knapsackProAPI
      .fetchTestsFromQueue(
        this.allTestFiles,
        initializeQueue,
        attemptConnectToQueue,
      )
      .then((response) => {
        const apiCode: QueueApiResponseCodes = response.data.code;

        if (apiCode === QueueApiResponseCodes.AttemptConnectToQueueFailed) {
          this.fetchTestsFromQueue(true, false, onSuccess, onFailure);
          return;
        }

        const queueTestFiles = response.data.test_files;
        const isQueueEmpty = queueTestFiles.length === 0;

        if (isQueueEmpty) {
          this.finishQueueMode();
          return;
        }

        onSuccess(queueTestFiles).then(
          ({ recordedTestFiles, isTestSuiteGreen }) => {
            this.updateRecordedTestFiles(recordedTestFiles, isTestSuiteGreen);
            this.fetchTestsFromQueue(false, false, onSuccess, onFailure);
          },
        );
      })
      .catch((error) => {
        if (this.knapsackProAPI.isExpectedErrorStatus(error)) {
          // when API returned expected error then CI node should fail
          // this should prevent from running tests in Fallback Mode
          process.exitCode = 1;
          throw new Error(
            'Knapsack Pro API returned an error. See the above logs.',
          );
        }

        onFailure(error);

        this.knapsackProLogger.warn(
          'Fallback Mode has started. We could not connect to Knapsack Pro API. Your tests will be executed based on test file names.\n\nIf other CI nodes were able to connect to Knapsack Pro API then you may notice that some of the test files were executed twice across CI nodes. Fallback Mode guarantees each of test files is run at least once as a part of CI build.',
        );

        const fallbackTestDistributor = new FallbackTestDistributor(
          this.allTestFiles,
          this.recordedTestFiles,
        );
        const testFiles = fallbackTestDistributor.testFilesForCiNode();

        const executedTestFiles = KnapsackProLogger.objectInspect(
          this.recordedTestFiles,
        );
        this.knapsackProLogger.debug(
          `Test files already executed:\n${executedTestFiles}`,
        );
        const inspectedTestFiles = KnapsackProLogger.objectInspect(testFiles);
        this.knapsackProLogger.debug(
          `Test files to be run in Fallback Mode:\n${inspectedTestFiles}`,
        );

        onSuccess(testFiles).then(({ recordedTestFiles, isTestSuiteGreen }) => {
          this.updateRecordedTestFiles(recordedTestFiles, isTestSuiteGreen);
          this.finishQueueMode();
        });
      });
  }

  private updateRecordedTestFiles(
    recordedTestFiles: TestFile[],
    isTestSuiteGreen: boolean,
  ) {
    this.recordedTestFiles = this.recordedTestFiles.concat(recordedTestFiles);
    this.isTestSuiteGreen = this.isTestSuiteGreen && isTestSuiteGreen;
  }

  private finishQueueMode() {
    this.createBuildSubset(this.recordedTestFiles);
    process.exitCode = this.isTestSuiteGreen ? 0 : 1;
  }

  // saves recorded timing for tests executed on single CI node
  private createBuildSubset(testFiles: TestFile[]) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    this.knapsackProAPI.createBuildSubset(testFiles).catch((error) => {
      this.knapsackProLogger.error(
        'Could not save recorded timing of tests due to failed request to Knapsack Pro API.',
      );
    });
  }

  private sha256(content: string) {
    return createHash('sha256').update(content).digest('hex');
  }
}
