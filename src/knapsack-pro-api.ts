import axios, { AxiosPromise } from "axios";

import { EnvConfig } from "./env-config";
import { TestFile } from "./models";

export class KnapsackProAPI {
  private readonly apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = EnvConfig.endpoint;
  }

  // allTestFiles in whole user's test suite
  public fetchTestsFromQueue(allTestFiles: TestFile[], initializeQueue: boolean): AxiosPromise<any> {
    const url = `${this.apiBaseUrl}/v1/queues/queue`;
    const data = {
      test_suite_token: EnvConfig.testSuiteToken,
      can_initialize_queue: initializeQueue,
      fixed_queue_split: EnvConfig.fixedQueueSplit,
      commit_hash: EnvConfig.commitHash,
      branch: EnvConfig.branch,
      node_total: EnvConfig.ciNodeTotal,
      node_index: EnvConfig.ciNodeIndex,
      node_build_id: EnvConfig.ciNodeBuildId,
      test_files: allTestFiles,
    };

    return axios.post(url, data);
  }

  public createBuildSubset(recordedTestFiles: TestFile[]): AxiosPromise<any> {
    const url = `${this.apiBaseUrl}/v1/build_subsets`;
    const data = {
      test_suite_token: EnvConfig.testSuiteToken,
      commit_hash: EnvConfig.commitHash,
      branch: EnvConfig.branch,
      node_total: EnvConfig.ciNodeTotal,
      node_index: EnvConfig.ciNodeIndex,
      test_files: recordedTestFiles,
    };

    return axios.post(url, data);
  }
}
