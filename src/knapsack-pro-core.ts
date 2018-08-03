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

  initQueueMode(onSuccess: () => void, onFailure: () => void) {
    this.fetchTestsFromQueue(true);
  }

  private fetchTestsFromQueue(initializeQueue = false) {
    this.knapsackProAPI.fetchTestsFromQueue(this.allTestFiles, initializeQueue)
      .then(response => {
        this.knapsackProLogger.logResponse(response);

        const queueTestFiles = response.data.test_files;
        const queueEmpty = queueTestFiles.length === 0;

        if (queueEmpty) {
          this.sendTestSuiteSubsetSummary(this.recordedTestFiles);
          return;
        }

        this.runSpecFiles(queueTestFiles);
      })
      .catch(error => {
        this.knapsackProLogger.logError(error);
      });
  }

  private runSpecFiles(testFiles: TestFile[]) {
    const testFilesEmpty = testFiles.length === 0;
    if (testFilesEmpty) {
      this.fetchTestsFromQueue(this.allTestFiles);
      return;
    }

    const testFilesHead = testFiles[0].path;
    const specProcess = childProcess.fork(
      `${__dirname}${path.sep}run-spec-file.js`,
      [testFilesHead]
    );

    specProcess.on('message', testFile => {
      this.recordedTestFiles.push(testFile);
    });

    specProcess.on('error', error => {
      if (error) throw error;
    });

    specProcess.on('exit', exitCode => {
      const testFilesTail = testFiles.slice(1);
      this.runSpecFiles(testFilesTail);

      if (exitCode !== 0) process.exitCode = exitCode;
    });
  }

  private sendTestSuiteSubsetSummary(testFiles: TestFile[]) {
    this.knapsackProAPI.createBuildSubset(testFiles)
      .then(response => {
        this.knapsackProLogger.logResponse(response);
      })
      .catch(error => {
        this.knapsackProLogger.logError(error);
      });
  }
}