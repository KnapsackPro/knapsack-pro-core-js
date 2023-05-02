import { CIProviderBase } from '.';

export class GitlabCI extends CIProviderBase {
  public static get ciNodeTotal(): string | void {
    return process.env.CI_NODE_TOTAL;
  }

  // eslint-disable-next-line getter-return, consistent-return
  public static get ciNodeIndex(): string | void {
    if (process.env.GITLAB_CI) {
      const index = process.env.CI_NODE_INDEX; // GitLab >= 11.5

      if (index) {
        return (parseInt(index, 10) - 1).toString();
      }
    }
  }

  public static get ciNodeBuildId(): string | void {
    // GitLab Release 9.0+ || GitLab Release 8.x
    return process.env.CI_PIPELINE_ID || process.env.CI_BUILD_ID;
  }

  public static get commitHash(): string | void {
    // GitLab Release 9.0+ || GitLab Release 8.x
    return process.env.CI_COMMIT_SHA || process.env.CI_BUILD_REF;
  }

  public static get branch(): string | void {
    // GitLab Release 9.0+ || GitLab Release 8.x
    return process.env.CI_COMMIT_REF_NAME || process.env.CI_BUILD_REF_NAME;
  }

  public static get userSeat(): string | void {
    const userName = process.env.GITLAB_USER_NAME; // Gitlab Release 10.0
    const userEmail = process.env.GITLAB_USER_EMAIL; // Gitlab Release 8.12
    return userName || userEmail;
  }
}
