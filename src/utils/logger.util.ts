import * as fs from "fs";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export enum LogLevel {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
}
export class LoggerUtil {
  logger;

  constructor(label: string, logToFile = false) {
    const transports: winston.transport[] = [
      new winston.transports.Console({}),
    ];

    if (logToFile) {
      this.setupLogFilesDirectory();
      transports.push(
        new DailyRotateFile({
          filename: `logs/${label}_log-%DATE%.log`,
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "1d",
        })
      );
    }

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.label({ label }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
      transports,
    });
  }

  private setupLogFilesDirectory() {
    const logFilesDirectory = "logs";
    if (!fs.existsSync(logFilesDirectory)) {
      fs.mkdirSync(logFilesDirectory);
    }
  }
}
