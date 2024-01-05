import dotenv from "dotenv";
import type { Logger } from "winston";
import type { CommonDependencies } from "./common/commonDependencyInjector";
import { CommonDependencyInjector } from "./common/commonDependencyInjector";

export interface EnvironmentConfig {
  host: string;
  port: number | string;
}

interface EnvironmentDependencies extends CommonDependencies {}

export class Environment extends CommonDependencyInjector {
  private logger;
  private environment?: EnvironmentConfig = undefined;

  constructor(environmentDependencies: EnvironmentDependencies) {
    const { logger } = environmentDependencies;
    super({ logger });
    this.logger = logger;
    this.initializeEnvironment();

    this.getEnvironmentConfig = this.getEnvironmentConfig.bind(this);
  }

  private initializeEnvironment() {
    dotenv.config();

    this.environment = {
      host: process.env["HOST"] || "localhost",
      port: process.env["PORT"] || "3002",
    };

    this.logger.info("The environment variables have been initialized.");
  }

  getEnvironmentConfig() {
    if (!this.environment) {
      throw new Error("Environment variables are not initialized!");
    }

    return this.environment;
  }
}
