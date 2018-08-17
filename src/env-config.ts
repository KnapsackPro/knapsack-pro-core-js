export class EnvConfig {
  public static get endpoint(): string {
    if (process.env.KNAPSACK_PRO_ENDPOINT) {
      return process.env.KNAPSACK_PRO_ENDPOINT;
    }

    return "https://api-staging.knapsackpro.com";
  }

  public static get testSuiteToken(): string | void {
    if (process.env.KNAPSACK_PRO_TEST_SUITE_TOKEN) {
      return process.env.KNAPSACK_PRO_TEST_SUITE_TOKEN;
    }

    throw new Error(
      `Please set test suite API token in CI environment variables.
      Please check README for the Knapsack Pro client library.`,
    );
  }

  public static get fixedQueueSplit(): boolean {
    if (process.env.KNAPSACK_PRO_FIXED_QUEUE_SPLIT) {
      return process.env.KNAPSACK_PRO_FIXED_QUEUE_SPLIT.toLowerCase() === "true";
    }

    return false;
  }
}
