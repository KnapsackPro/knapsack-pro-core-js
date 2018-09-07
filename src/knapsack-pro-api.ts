import axios, { AxiosInstance, AxiosPromise } from "axios";

import { KnapsackProEnvConfig } from "./config";
import { TestFile } from "./models";

export class KnapsackProAPI {
  private readonly api: AxiosInstance;

  constructor(clientName: string, clientVersion: string) {
    this.api = axios.create({
      baseURL: KnapsackProEnvConfig.endpoint,
      timeout: 15000,
      headers: {
        "KNAPSACK-PRO-CLIENT-NAME": clientName,
        "KNAPSACK-PRO-CLIENT-VERSION": clientVersion,
      },
    });
  }

  // allTestFiles in whole user's test suite
  public fetchTestsFromQueue(allTestFiles: TestFile[], initializeQueue: boolean): AxiosPromise<any> {
    const url = "/v1/queues/queue";
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

    return this.api.post(url, data);
  }

  public createBuildSubset(recordedTestFiles: TestFile[]): AxiosPromise<any> {
    const url = "/v1/build_subsets";
    const data = {
      test_suite_token: KnapsackProEnvConfig.testSuiteToken,
      commit_hash: KnapsackProEnvConfig.commitHash,
      branch: KnapsackProEnvConfig.branch,
      node_total: KnapsackProEnvConfig.ciNodeTotal,
      node_index: KnapsackProEnvConfig.ciNodeIndex,
      test_files: recordedTestFiles,
    };

    return this.api.post(url, data);
  }
}
