import childProcess = require("child_process");
import { CIEnvConfig } from ".";

const { spawnSync } = childProcess;

export class KnapsackProEnvConfig {
  public static get endpoint(): string {
    if (process.env.KNAPSACK_PRO_ENDPOINT) {
      return process.env.KNAPSACK_PRO_ENDPOINT;
    }

    return "https://api.knapsackpro.com";
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

  public static get ciNodeTotal(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_TOTAL) {
      return process.env.KNAPSACK_PRO_CI_NODE_TOTAL;
    }

    const ciNodeTotal = CIEnvConfig.ciNodeTotal;
    if (ciNodeTotal) { return ciNodeTotal; }

    throw new Error("Undefined number of total CI nodes! Please set KNAPSACK_PRO_CI_NODE_TOTAL environment variable.");
  }

  public static get ciNodeIndex(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_INDEX) {
      return process.env.KNAPSACK_PRO_CI_NODE_INDEX;
    }

    const ciNodeIndex = CIEnvConfig.ciNodeIndex;
    if (ciNodeIndex) { return ciNodeIndex; }

    throw new Error("Undefined CI node index! Please set KNAPSACK_PRO_CI_NODE_INDEX environment variable.");
  }

  public static get ciNodeBuildId(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID) {
      return process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID;
    }

    const ciNodeBuildId = CIEnvConfig.ciNodeBuildId;
    if (ciNodeBuildId) { return ciNodeBuildId; }

    // this is key known to Knapsack Pro API, do not change it!
    const knapsackProMissingBuildIdKey = "missing-build-id";

    // set env variable so next function call won't show information about missing build ID
    process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID = knapsackProMissingBuildIdKey;
    console.log(
      "CI node build ID not detected! Your tests will run anyway."
      + "\n\n"
      + "If you want to be able to run more than one CI build at the same time for exactly the same commit hash,"
      + " branch name and number of parallel CI nodes then you have to set unique KNAPSACK_PRO_CI_NODE_BUILD_ID"
      + " environment variable for each CI build."
      + "\n\n"
      + "For instance you can generate KNAPSACK_PRO_CI_NODE_BUILD_ID=$(openssl rand - base64 32)"
      + "\n\n"
      + "Note the CI build ID must be the same for parallel CI nodes being part of the single CI build.",
    );

    return process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID;
  }

  public static get commitHash(): string | never {
    if (process.env.KNAPSACK_PRO_COMMIT_HASH) {
      return process.env.KNAPSACK_PRO_COMMIT_HASH;
    }

    const commitHash = CIEnvConfig.commitHash;
    if (commitHash) { return commitHash; }

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

    const branch = CIEnvConfig.branch;
    if (branch) { return branch; }

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

  public static get logLevel(): string {
    if (process.env.KNAPSACK_PRO_LOG_LEVEL) {
      return process.env.KNAPSACK_PRO_LOG_LEVEL;
    }

    return "info";
  }
}
