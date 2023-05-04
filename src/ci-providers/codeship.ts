import { CIProviderBase } from '.';

export class Codeship extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.CI_BUILD_NUMBER;
  }

  public static get commitHash(): string | void {
    return process.env.CI_COMMIT_ID;
  }

  public static get branch(): string | void {
    return process.env.CI_BRANCH;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
