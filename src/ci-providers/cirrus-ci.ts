import { CIProviderBase } from '.';

export class CirrusCI extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.CI_NODE_TOTAL;
  }

  public static get ciNodeIndex(): string | void {
    return process.env.CI_NODE_INDEX;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.CIRRUS_BUILD_ID;
  }

  public static get commitHash(): string | void {
    return process.env.CIRRUS_CHANGE_IN_REPO;
  }

  public static get branch(): string | void {
    return process.env.CIRRUS_BRANCH;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
