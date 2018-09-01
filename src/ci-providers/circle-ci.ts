export class CircleCI {
  public static get commitHash(): string | void {
    return process.env.CIRCLE_SHA1;
  }
}
