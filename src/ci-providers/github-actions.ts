import { CIProviderBase } from '.';

// https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables
export class GithubActions extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): void {
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
}
