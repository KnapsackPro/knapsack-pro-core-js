import childProcess = require("child_process");

const { spawnSync } = childProcess;

export class EnvConfig {
  public static get endpoint(): string {
    if (process.env.KNAPSACK_PRO_ENDPOINT) {
      return process.env.KNAPSACK_PRO_ENDPOINT;
    }

    return "https://api-staging.knapsackpro.com";
  }

  public static get testSuiteToken(): string | never {
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

  public static get commitHash(): string | never {
    if (process.env.KNAPSACK_PRO_COMMIT_HASH) {
      return process.env.KNAPSACK_PRO_COMMIT_HASH;
    }

    const gitProcess = spawnSync("git", ["rev-parse", "HEAD"]);
    if (gitProcess.status === 0) {
      const gitCommitHash = gitProcess.stdout.toString().trim();

      // set env variable so next function call won't spawn git process again
      process.env.KNAPSACK_PRO_COMMIT_HASH = gitCommitHash;

      return gitCommitHash;
    } else if (gitProcess.stderr === null) {
      // gitProcess may fail with stderr null, for instance when git command does not exist on the machine
      console.error(
        "We tried to detect commit hash using git but it failed.",
        "Please ensure you have have git installed or set KNAPSACK_PRO_COMMIT_HASH environment variable.",
      );
    } else {
      const gitErrorMessage = gitProcess.stderr.toString();
      console.error("There was error in detecting commit hash using git installed on the machine:");
      console.error(gitErrorMessage);
    }

    throw new Error("Undefined commit hash! Please set KNAPSACK_PRO_COMMIT_HASH environment variable.");
  }

  public static get branch(): string | never {
    if (process.env.KNAPSACK_PRO_BRANCH) {
      return process.env.KNAPSACK_PRO_BRANCH;
    }

    const gitProcess = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
    if (gitProcess.status === 0) {
      const gitBranch = gitProcess.stdout.toString().trim();

      // set env variable so next function call won't spawn git process again
      process.env.KNAPSACK_PRO_BRANCH = gitBranch;

      return gitBranch;
    } else if (gitProcess.stderr === null) {
      // gitProcess may fail with stderr null, for instance when git command does not exist on the machine
      console.error(
        "We tried to detect branch name using git but it failed.",
        "Please ensure you have have git installed or set KNAPSACK_PRO_BRANCH environment variable.",
      );
    } else {
      const gitErrorMessage = gitProcess.stderr.toString();
      console.error("There was error in detecting branch name using git installed on the machine:");
      console.error(gitErrorMessage);
    }

    throw new Error("Undefined branch name! Please set KNAPSACK_PRO_BRANCH environment variable.");
  }

  public static get ciNodeTotal(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_TOTAL) {
      return process.env.KNAPSACK_PRO_CI_NODE_TOTAL;
    }

    throw new Error("Undefined number of total CI nodes! Please set KNAPSACK_PRO_CI_NODE_TOTAL environment variable.");
  }

  public static get ciNodeIndex(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_INDEX) {
      return process.env.KNAPSACK_PRO_CI_NODE_INDEX;
    }

    throw new Error("Undefined CI node index! Please set KNAPSACK_PRO_CI_NODE_INDEX environment variable.");
  }

  public static get ciNodeBuildId(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID) {
      return process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID;
    }

    throw new Error("Undefined CI node build ID! Please set KNAPSACK_PRO_CI_NODE_BUILD_ID environment variable.");
  }
}
