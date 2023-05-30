import { CIProviderBase } from '.';

// https://codefresh.io/docs/docs/codefresh-yaml/variables/#system-provided-variables
export class CodefreshCI extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.CF_BUILD_ID;
  }

  public static get ciNodeRetryCount(): void {
    return undefined;
  }

  public static get commitHash(): string | void {
    return process.env.CF_REVISION;
  }

  public static get branch(): string | void {
    return process.env.CF_BRANCH;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
