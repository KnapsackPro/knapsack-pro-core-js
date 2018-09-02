export abstract class CIProviderBase {
  public static get ciNodeTotal(): string | void {
    throw new Error("nodeTotal getter is not implemented!");
  }

  public static get ciNodeIndex(): string | void {
    throw new Error("nodeIndex getter is not implemented!");
  }

  public static get ciNodeBuildId(): string | void {
    throw new Error("nodeBuildId getter is not implemented!");
  }

  public static get commitHash(): string | void {
    throw new Error("commitHash getter is not implemented!");
  }

  public static get branch(): string | void {
    throw new Error("branch getter is not implemented!");
  }
}
