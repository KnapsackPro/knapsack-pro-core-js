export abstract class CIProvider {
  public static get commitHash(): string | void {
    throw new Error("commitHash getter is not implemented!");
  }
}
