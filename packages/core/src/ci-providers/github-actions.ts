import { CIProviderBase } from '.';

// https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
export class GithubActions extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    // A unique number for each run within a repository.
    // This number does not change if you re-run the workflow run.
    return process.env.GITHUB_RUN_ID;
  }

  public static get ciNodeRetryCount(): string | void {
    // A unique number for each attempt of a particular workflow run in a repository.
    // This number begins at 1 for the workflow run's first attempt, and increments with each re-run.
    const runAttempt = process.env.GITHUB_RUN_ATTEMPT;

    if (runAttempt) {
      const runAttemptNumber = parseInt(runAttempt, 10) - 1;
      return String(runAttemptNumber);
    }

    return undefined;
  }

  public static get commitHash(): string | void {
    return process.env.GITHUB_SHA;
  }

  public static get branch(): string | void {
    // GITHUB_REF - The branch or tag ref that triggered the workflow.
    // For example, refs/heads/feature-branch-1.
    // If neither a branch or tag is available for the event type, the variable will not exist.
    return process.env.GITHUB_REF || process.env.GITHUB_SHA;
  }

  public static get userSeat(): string | void {
    return process.env.GITHUB_ACTOR;
  }
}
