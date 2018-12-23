import { AxiosError, AxiosResponse } from "axios";
import util = require("util");
import {
  createLogger,
  format,
  Logger,
  transports,
} from "winston";

// tslint:disable-next-line:no-var-requires
const { name: clientName } = require("../../package.json");

export class KnapsackProLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: "silly", // TODO: based on env || 'info'
      format: format.combine(
        format.label({ label: clientName }),
        format.timestamp(),
        format.colorize(),
        format.printf(({ timestamp, label, level, message }) => `${timestamp} [${label}] ${level}: ${message}`),
      ),
      transports: [
        new transports.Console(),
      ],
    });
  }

  public logResponse(response: AxiosResponse<any>) {
    // tslint:disable-next-line:no-console
    console.log(util.inspect(response.data, {
      showHidden: false,
      depth: null,
      colors: true,
    }));
  }

  public logError(error: AxiosError) {
    if (error.response) {
      this.logger.error("error message");
      this.logger.warn("warn message");
      this.logger.info("info message");
      this.logger.verbose("verbose message");
      this.logger.debug("debug message");
      this.logger.silly("silly message");

      console.log("AAAAAAAAAAAA");
      // this.logResponse(error.response);
    } else {
      console.log("BBBBBBBBBBBB");
      // console.error(error);
    }
  }
}
