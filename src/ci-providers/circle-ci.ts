import { CIProviderBase } from '.';

export class CircleCI extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.CIRCLE_NODE_TOTAL;
  }

  public static get ciNodeIndex(): string | void {
    return process.env.CIRCLE_NODE_INDEX;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.CIRCLE_BUILD_NUM;
  }

  public static get commitHash(): string | void {
    return process.env.CIRCLE_SHA1;
  }

  public static get branch(): string | void {
    return process.env.CIRCLE_BRANCH;
  }

  public static get userSeat(): string | void {
    return process.env.CIRCLE_USERNAME || process.env.CIRCLE_PR_USERNAME;
  }
}
