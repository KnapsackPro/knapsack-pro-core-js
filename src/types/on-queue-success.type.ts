import { TestFile } from '../models';

export type onQueueSuccessType = (queueTestFiles: TestFile[]) => Promise<{
  recordedTestFiles: TestFile[];
  isTestSuiteGreen: boolean;
}>;
