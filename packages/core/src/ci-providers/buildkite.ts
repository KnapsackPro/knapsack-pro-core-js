import { CIProviderBase } from '.';

export class Buildkite extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.BUILDKITE_PARALLEL_JOB_COUNT;
  }

  public static get ciNodeIndex(): string | void {
    return process.env.BUILDKITE_PARALLEL_JOB;
  }

  public static get ciNodeBuildId(): string | void {
    return process.env.BUILDKITE_BUILD_NUMBER;
  }

  public static get ciNodeRetryCount(): string | void {
    return process.env.BUILDKITE_RETRY_COUNT;
  }

  public static get commitHash(): string | void {
    return process.env.BUILDKITE_COMMIT;
  }

  public static get branch(): string | void {
    return process.env.BUILDKITE_BRANCH;
  }

  public static get userSeat(): string | void {
    return (
      process.env.BUILDKITE_BUILD_AUTHOR || process.env.BUILDKITE_BUILD_CREATOR
    );
  }
}
