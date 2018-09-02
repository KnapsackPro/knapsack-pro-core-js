import { CIProvider } from ".";

export class CircleCI extends CIProvider {
  public static get commitHash(): string | void {
    return process.env.CIRCLE_SHA1;
  }
}
