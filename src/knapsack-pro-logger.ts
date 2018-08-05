import { AxiosError, AxiosResponse } from "axios";
import util = require("util");

export class KnapsackProLogger {
  public logResponse(response: AxiosResponse<any>) {
    // tslint:disable-next-line:no-console
    console.log(util.inspect(response.data, {
      showHidden: false,
      depth: null,
    }));
  }

  public logError(error: AxiosError) {
    this.logResponse(error.response);
  }
}
