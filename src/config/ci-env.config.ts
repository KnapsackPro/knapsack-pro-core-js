import {
  AppVeyor,
  Buildkite,
  CircleCI,
  CirrusCI,
  Codeship,
  GitlabCI,
  HerokuCI,
  SemaphoreCI,
  SemaphoreCI2,
  SolanoCI,
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

  private static ciEnvFor(functionName: string): string | void {
    const supportedCIProviders: any[] = [
      // load GitLab CI first to avoid edge case with order of loading envs for CI_NODE_INDEX
      GitlabCI,
      AppVeyor,
      Buildkite,
      CircleCI,
      CirrusCI,
      Codeship,
      HerokuCI,
      SemaphoreCI,
      SemaphoreCI2,
      SolanoCI,
      TravisCI,
    ];

    for (const ciProvider of supportedCIProviders) {
      const value = ciProvider[functionName];
      if (value) {
        return value;
      }
    }
  }
}
