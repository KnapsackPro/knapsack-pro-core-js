import { createHash } from 'node:crypto';
import childProcess = require('child_process');
import { CIEnvConfig } from '.';
import { KnapsackProLogger } from '../knapsack-pro-logger';

const { spawnSync } = childProcess;

function logLevel(): string {
  if (process.env.KNAPSACK_PRO_LOG_LEVEL) {
    return process.env.KNAPSACK_PRO_LOG_LEVEL;
  }

  return 'info';
}

const knapsackProLogger = new KnapsackProLogger(logLevel());

export class KnapsackProEnvConfig {
  public static get endpoint(): string {
    if (process.env.KNAPSACK_PRO_ENDPOINT) {
      return process.env.KNAPSACK_PRO_ENDPOINT;
    }

    return 'https://api.knapsackpro.com';
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
      return (
        process.env.KNAPSACK_PRO_FIXED_QUEUE_SPLIT.toLowerCase() === 'true'
      );
    }

    return false;
  }

  public static get ciNodeTotal(): number | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_TOTAL) {
      return parseInt(process.env.KNAPSACK_PRO_CI_NODE_TOTAL, 10);
    }

    const { ciNodeTotal } = CIEnvConfig;
    if (ciNodeTotal) {
      return parseInt(ciNodeTotal, 10);
    }

    throw new Error(
      'Undefined number of total CI nodes! Please set KNAPSACK_PRO_CI_NODE_TOTAL environment variable.',
    );
  }

  public static get ciNodeIndex(): number | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_INDEX) {
      return parseInt(process.env.KNAPSACK_PRO_CI_NODE_INDEX, 10);
    }

    const { ciNodeIndex } = CIEnvConfig;
    if (ciNodeIndex) {
      return parseInt(ciNodeIndex, 10);
    }

    throw new Error(
      'Undefined CI node index! Please set KNAPSACK_PRO_CI_NODE_INDEX environment variable.',
    );
  }

  public static get ciNodeBuildId(): string | never {
    if (process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID) {
      return process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID;
    }

    const { ciNodeBuildId } = CIEnvConfig;
    if (ciNodeBuildId) {
      return ciNodeBuildId;
    }

    // this is key known to Knapsack Pro API, do not change it!
    const knapsackProMissingBuildIdKey = 'missing-build-id';

    // set env variable so next function call won't show information about missing build ID
    process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID = knapsackProMissingBuildIdKey;

    knapsackProLogger.warn(
      'CI node build ID not detected! Your tests will run anyway.\n\n' +
        'If you want to be able to run more than one CI build at the same time for exactly the same commit hash, branch name and number of parallel CI nodes then you have to set unique KNAPSACK_PRO_CI_NODE_BUILD_ID environment variable.\n\n' +
        'For instance you can generate KNAPSACK_PRO_CI_NODE_BUILD_ID=$(openssl rand - base64 32)\n\n' +
        'Please ensure KNAPSACK_PRO_CI_NODE_BUILD_ID has the same value for all parallel CI nodes being part of the single CI build. Thanks to that the parallel nodes will consume tests from the same Queue.',
    );

    return process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID;
  }

  public static get commitHash(): string | never {
    if (process.env.KNAPSACK_PRO_COMMIT_HASH) {
      return process.env.KNAPSACK_PRO_COMMIT_HASH;
    }

    const { commitHash } = CIEnvConfig;
    if (commitHash) {
      return commitHash;
    }

    const gitProcess = spawnSync('git', ['rev-parse', 'HEAD']);
    if (gitProcess.status === 0) {
      const gitCommitHash = gitProcess.stdout.toString().trim();

      // set env variable so next function call won't spawn git process again
      process.env.KNAPSACK_PRO_COMMIT_HASH = gitCommitHash;

      return gitCommitHash;
    }
    if (gitProcess.stderr === null) {
      // gitProcess may fail with stderr null,
      // for instance when git command does not exist on the machine
      knapsackProLogger.error(
        'We tried to detect commit hash using git but it failed. Please ensure you have have git installed or set KNAPSACK_PRO_COMMIT_HASH environment variable.',
      );
    } else {
      const gitErrorMessage = gitProcess.stderr.toString();
      knapsackProLogger.error(
        'There was error in detecting commit hash using git installed on the machine:',
      );
      knapsackProLogger.error(gitErrorMessage);
    }

    throw new Error(
      'Undefined commit hash! Please set KNAPSACK_PRO_COMMIT_HASH environment variable.',
    );
  }

  public static get branch(): string | never {
    if (process.env.KNAPSACK_PRO_BRANCH) {
      return process.env.KNAPSACK_PRO_BRANCH;
    }

    const { branch } = CIEnvConfig;
    if (branch) {
      return branch;
    }

    const gitProcess = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    if (gitProcess.status === 0) {
      const gitBranch = gitProcess.stdout.toString().trim();

      // set env variable so next function call won't spawn git process again
      process.env.KNAPSACK_PRO_BRANCH = gitBranch;

      return gitBranch;
    }
    if (gitProcess.stderr === null) {
      // gitProcess may fail with stderr null,
      // for instance when git command does not exist on the machine
      knapsackProLogger.error(
        'We tried to detect branch name using git but it failed. Please ensure you have have git installed or set KNAPSACK_PRO_BRANCH environment variable.',
      );
    } else {
      const gitErrorMessage = gitProcess.stderr.toString();
      knapsackProLogger.error(
        'There was error in detecting branch name using git installed on the machine:',
      );
      knapsackProLogger.error(gitErrorMessage);
    }

    throw new Error(
      'Undefined branch name! Please set KNAPSACK_PRO_BRANCH environment variable.',
    );
  }

  public static get logLevel(): string {
    return logLevel();
  }

  public static get testFileListSourceFile(): string | void {
    return process.env.KNAPSACK_PRO_TEST_FILE_LIST_SOURCE_FILE;
  }

  public static get userSeatHash(): string | void {
    if (process.env.KNAPSACK_PRO_USER_SEAT) {
      return this.sha256(process.env.KNAPSACK_PRO_USER_SEAT);
    }

    const { userSeat } = CIEnvConfig;
    if (userSeat) {
      return this.sha256(userSeat);
    }

    return undefined;
  }

  private static sha256(content: string) {
    return createHash('sha256').update(content).digest('hex');
  }
}
