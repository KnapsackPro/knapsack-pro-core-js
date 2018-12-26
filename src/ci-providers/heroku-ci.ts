import { CIProviderBase } from '.';

export class HerokuCI extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.CI_NODE_TOTAL;
  }

  public static get ciNodeIndex(): string | void {
    return process.env.CI_NODE_INDEX;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.HEROKU_TEST_RUN_ID;
  }

  public static get commitHash(): string | void {
    return process.env.HEROKU_TEST_RUN_COMMIT_VERSION;
  }

  public static get branch(): string | void {
    return process.env.HEROKU_TEST_RUN_BRANCH;
  }
}
