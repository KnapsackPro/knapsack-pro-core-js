import { CIProviderBase } from ".";

export class CircleCI extends CIProviderBase {
  public static get commitHash(): string | void {
    return process.env.CIRCLE_SHA1;
  }
}
