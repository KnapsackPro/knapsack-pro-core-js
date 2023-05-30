import { CIProviderBase } from '.';

export class SemaphoreCI2 extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.SEMAPHORE_JOB_COUNT;
  }

  // eslint-disable-next-line getter-return, consistent-return
  public static get ciNodeIndex(): string | void {
    const jobIndex = process.env.SEMAPHORE_JOB_INDEX;

    if (jobIndex) {
      return (parseInt(jobIndex, 10) - 1).toString();
    }
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.SEMAPHORE_WORKFLOW_ID;
  }

  public static get ciNodeRetryCount(): void {
    return undefined;
  }

  public static get commitHash(): string | void {
    return process.env.SEMAPHORE_GIT_SHA;
  }

  public static get branch(): string | void {
    return process.env.SEMAPHORE_GIT_BRANCH;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
