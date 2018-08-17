export class EnvConfig {
  public static get endpoint(): string {
    if (process.env.KNAPSACK_PRO_ENDPOINT) {
      return process.env.KNAPSACK_PRO_ENDPOINT;
    }

    return "https://api-staging.knapsackpro.com";
  }

  public static get testSuiteToken(): string {
    if (process.env.KNAPSACK_PRO_TEST_SUITE_TOKEN) {
      return process.env.KNAPSACK_PRO_TEST_SUITE_TOKEN;
    }

    // TODO: throw error
    // return "";
  }
}
