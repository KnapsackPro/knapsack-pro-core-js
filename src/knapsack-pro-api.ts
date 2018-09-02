import axios, { AxiosPromise } from "axios";

import { KnapsackProEnvConfig } from "./config";
import { TestFile } from "./models";

export class KnapsackProAPI {
  private readonly apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = KnapsackProEnvConfig.endpoint;
  }

  // allTestFiles in whole user's test suite
  public fetchTestsFromQueue(allTestFiles: TestFile[], initializeQueue: boolean): AxiosPromise<any> {
    const url = `${this.apiBaseUrl}/v1/queues/queue`;
    const data = {
      test_suite_token: KnapsackProEnvConfig.testSuiteToken,
      can_initialize_queue: initializeQueue,
      fixed_queue_split: KnapsackProEnvConfig.fixedQueueSplit,
      commit_hash: KnapsackProEnvConfig.commitHash,
      branch: KnapsackProEnvConfig.branch,
      node_total: KnapsackProEnvConfig.ciNodeTotal,
      node_index: KnapsackProEnvConfig.ciNodeIndex,
      node_build_id: KnapsackProEnvConfig.ciNodeBuildId,
      test_files: allTestFiles,
    };

    return axios.post(url, data);
  }

  public createBuildSubset(recordedTestFiles: TestFile[]): AxiosPromise<any> {
    const url = `${this.apiBaseUrl}/v1/build_subsets`;
    const data = {
      test_suite_token: KnapsackProEnvConfig.testSuiteToken,
      commit_hash: KnapsackProEnvConfig.commitHash,
      branch: KnapsackProEnvConfig.branch,
      node_total: KnapsackProEnvConfig.ciNodeTotal,
      node_index: KnapsackProEnvConfig.ciNodeIndex,
      test_files: recordedTestFiles,
    };

    return axios.post(url, data);
  }
}
