import { CIProviderBase } from ".";

// http://docs.solanolabs.com/Setup/tddium-set-environment-variables/
export class SolanoCI extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.TDDIUM_SESSION_ID;
  }

  public static get commitHash(): string | void {
    return process.env.TDDIUM_CURRENT_COMMIT;
  }

  public static get branch(): string | void {
    return process.env.TDDIUM_CURRENT_BRANCH;
  }
}
