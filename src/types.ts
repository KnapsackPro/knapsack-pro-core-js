import { TestFile } from "./test-file.model";

export type onQueueSuccessType = (queueTestFiles: TestFile[]) => Promise<{
  recordedTestFiles: TestFile[],
  isTestSuiteGreen: boolean,
}>;

export type onQueueFailureType = (error: any) => void;
