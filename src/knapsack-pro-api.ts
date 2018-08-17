import axios, { AxiosPromise } from "axios";

import { EnvConfig } from "./env-config";
import { TestFile } from "./test-file.model";

// TODO: use fake env data for testing
process.env.KNAPSACK_PRO_COMMIT_HASH = "ae3396177d9f8ca87e2b93b4b0a25babd09d574d";
process.env.KNAPSACK_PRO_BRANCH = "master";
process.env.KNAPSACK_PRO_NODE_TOTAL = "2";
process.env.KNAPSACK_PRO_NODE_INDEX = "0";
// process.env.KNAPSACK_PRO_NODE_BUILD_ID = "1234";
process.env.KNAPSACK_PRO_NODE_BUILD_ID = new Date().getTime() + ""; // TODO: use this for testing

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
      commit_hash: process.env.KNAPSACK_PRO_COMMIT_HASH,
      branch: process.env.KNAPSACK_PRO_BRANCH,
      node_total: process.env.KNAPSACK_PRO_NODE_TOTAL,
      node_index: process.env.KNAPSACK_PRO_NODE_INDEX,
      node_build_id: process.env.KNAPSACK_PRO_NODE_BUILD_ID,
      test_files: allTestFiles,
    };

    return axios.post(url, data);
  }

  public createBuildSubset(recordedTestFiles: TestFile[]): AxiosPromise<any> {
    const url = `${this.apiBaseUrl}/v1/build_subsets`;
    const data = {
      test_suite_token: EnvConfig.testSuiteToken,
      commit_hash: process.env.KNAPSACK_PRO_COMMIT_HASH,
      branch: process.env.KNAPSACK_PRO_BRANCH,
      node_total: process.env.KNAPSACK_PRO_NODE_TOTAL,
      node_index: process.env.KNAPSACK_PRO_NODE_INDEX,
      test_files: recordedTestFiles,
    };

    return axios.post(url, data);
  }
}
