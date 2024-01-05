import type { Request, Response } from "express";
import { Router } from "express";
import type { CommonDependencies } from "./common/commonDependencyInjector";
import { CommonDependencyInjectorWithRoutes } from "./common/commonDependencyInjector";

interface AppRouterDependencies extends CommonDependencies {}

export class AppRouter extends CommonDependencyInjectorWithRoutes {
  private logger;
  private router = Router();

  constructor(appRouterDependencies: AppRouterDependencies) {
    const { logger } = appRouterDependencies;
    super({ logger });
    this.logger = logger;

    this.handlePing = this.handlePing.bind(this);
    this.logger.info('The AppRouter has been initialized.');
  }

  private handlePing(request: Request, response: Response) {
    return response.status(200).send("pong");
  }

  registerRoutes() {
    this.router.get("/ping", this.handlePing);

    return this.router;
  }
}
