import { CircleCI } from "../ci-providers";

export class CIEnvConfig {
  public static get commitHash(): string | void {
    return this.ciEnvFor("commitHash");
  }

  private static ciEnvFor(functionName: string): string | void {
    const supportedCIProviders: any[] = [
      CircleCI,
    ];

    for (const ciProvider of supportedCIProviders) {
      const value = ciProvider[functionName];
      if (value) { return value; }
    }
  }
}
