import debug from "debug";
import { FastifyBaseLogger } from "fastify";

const log = debug("fastify");

export class Logger implements FastifyBaseLogger {
  public level: string = "debug";

  public silent = () => {};

  public info = log;
  public error = log;
  public debug = log;
  public fatal = log;
  public warn = log;
  public trace = log;

  public child = () => new Logger();
}
