import { AxiosError, AxiosResponse } from "axios";
import util = require("util");
import {
  createLogger,
  format,
  Logger,
  transports,
} from "winston";

import { KnapsackProEnvConfig } from "./config";

// tslint:disable-next-line:no-var-requires
const { name: clientName } = require("../../package.json");

export class KnapsackProLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: KnapsackProEnvConfig.logLevel,
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

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public verbose(message: string) {
    this.logger.info(message);
  }

  public debug(message: string) {
    this.logger.info(message);
  }

  public silly(message: string) {
    this.logger.info(message);
  }

  public responseInfo(response: AxiosResponse<any>) {
    this.logger.info(`API response:\n${util.inspect(response.data, {
      showHidden: false,
      depth: null,
      colors: true,
    })}`);
  }

  public handleError(error: AxiosError) {
    if (error.response) {
      this.responseInfo(error.response);
    } else {
      this.logger.error(error);
    }
  }
}
