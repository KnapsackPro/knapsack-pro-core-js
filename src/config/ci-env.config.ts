import {
  AppVeyor,
  Buildkite,
  CircleCI,
  CirrusCI,
  CodefreshCI,
  Codeship,
  GithubActions,
  GitlabCI,
  HerokuCI,
  SemaphoreCI,
  SemaphoreCI2,
  TravisCI,
} from '../ci-providers';

export class CIEnvConfig {
  public static get ciNodeTotal(): string | void {
    return this.ciEnvFor('ciNodeTotal');
  }

  public static get ciNodeIndex(): string | void {
    return this.ciEnvFor('ciNodeIndex');
  }

  public static get ciNodeBuildId(): string | void {
    return this.ciEnvFor('ciNodeBuildId');
  }

  public static get commitHash(): string | void {
    return this.ciEnvFor('commitHash');
  }

  public static get branch(): string | void {
    return this.ciEnvFor('branch');
  }

  public static get userSeat(): string | void {
    return this.ciEnvFor('userSeat');
  }

  // eslint-disable-next-line consistent-return
  private static ciEnvFor(functionName: string): string | void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supportedCIProviders: any[] = [
      // load GitLab CI first to avoid edge case with order of loading envs for CI_NODE_INDEX
      GitlabCI,
      AppVeyor,
      Buildkite,
      CircleCI,
      CirrusCI,
      CodefreshCI,
      Codeship,
      GithubActions,
      HerokuCI,
      SemaphoreCI,
      SemaphoreCI2,
      TravisCI,
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const ciProvider of supportedCIProviders) {
      const value = ciProvider[functionName];
      if (value) {
        return value;
      }
    }
  }
}
