import { CIProviderBase } from '.';

// https://www.appveyor.com/docs/environment-variables/
export class AppVeyor extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.APPVEYOR_BUILD_ID;
  }

  public static get ciNodeRetryCount(): void {
    return undefined;
  }

  public static get commitHash(): string | void {
    return process.env.APPVEYOR_REPO_COMMIT;
  }

  public static get branch(): string | void {
    return process.env.APPVEYOR_REPO_BRANCH;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
