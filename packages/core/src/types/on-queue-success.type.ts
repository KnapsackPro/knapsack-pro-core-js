import { TestFile } from '../models';

// eslint-disable-next-line no-unused-vars
export type onQueueSuccessType = (queueTestFiles: TestFile[]) => Promise<{
  recordedTestFiles: TestFile[];
  isTestSuiteGreen: boolean;
}>;
