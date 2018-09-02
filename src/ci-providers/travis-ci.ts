import { CIProviderBase } from ".";

export class TravisCI extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.TRAVIS_BUILD_NUMBER;
  }

  public static get commitHash(): string | void {
    return process.env.TRAVIS_COMMIT;
  }

  public static get branch(): string | void {
    return process.env.TRAVIS_BRANCH;
  }
}
