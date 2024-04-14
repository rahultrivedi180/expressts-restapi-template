import dotenv from "dotenv";
import { CommonDependencyInjector, type CommonDependencies } from "./common/commonDependencyInjector";

export interface EnvironmentConfig {
  host: string;
  port: number | string;
}

interface EnvironmentDependencies extends CommonDependencies, Partial<EnvironmentConfig> {}

export class Environment extends CommonDependencyInjector {
  private logger;
  private environment?: EnvironmentConfig = undefined;

  constructor(environmentDependencies: EnvironmentDependencies) {
    const { logger, host, port } = environmentDependencies;
    super({ logger });
    this.logger = logger;

    this.initializeEnvironment({host, port});
    this.getEnvironmentConfig = this.getEnvironmentConfig.bind(this);
  }

  private initializeEnvironment(params: Partial<EnvironmentConfig>) {
    dotenv.config();

    const HOST = process.env['HOST'] || params.host || "localhost";
    const PORT = process.env['PORT'] || params.port || "3002";

    this.environment = {
      host: HOST,
      port: PORT,
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
