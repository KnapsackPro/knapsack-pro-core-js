import { CIProviderBase } from '.';

export class SemaphoreCI2 extends CIProviderBase {
  public static get ciNodeTotal(): void {
    return undefined;
  }

  public static get ciNodeIndex(): void {
    return undefined;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.SEMAPHORE_WORKFLOW_ID;
  }

  public static get commitHash(): string | void {
    return process.env.SEMAPHORE_GIT_SHA;
  }

  public static get branch(): string | void {
    return process.env.SEMAPHORE_GIT_BRANCH;
  }
}
