import { CIProviderBase } from '.';

export class SemaphoreCI extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.SEMAPHORE_THREAD_COUNT;
  }

  // eslint-disable-next-line getter-return, consistent-return
  public static get ciNodeIndex(): string | void {
    const currentThread = process.env.SEMAPHORE_CURRENT_THREAD;

    if (currentThread) {
      return (parseInt(currentThread, 10) - 1).toString();
    }
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.SEMAPHORE_BUILD_NUMBER;
  }

  public static get commitHash(): string | void {
    return process.env.REVISION;
  }

  public static get branch(): string | void {
    return process.env.BRANCH_NAME;
  }

  public static get userSeat(): void {
    return undefined;
  }
}
