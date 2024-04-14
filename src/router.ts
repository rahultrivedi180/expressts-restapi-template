import { Router } from "express";
import type { Routers } from "./interfaces/dependencyInterfaces";
import {
  CommonDependencyInjectorWithRoutes,
  type CommonDependencies,
} from "./common/commonDependencyInjector";

interface AppRouterDependencies extends CommonDependencies {
  routers: Routers;
}

export class AppRouter extends CommonDependencyInjectorWithRoutes {
  private logger;
  private routers;
  private router = Router();

  constructor(appRouterDependencies: AppRouterDependencies) {
    const { logger, routers } = appRouterDependencies;
    super({ logger });
    this.logger = logger;
    this.routers = routers;

    this.logger.info("The AppRouter has been initialized.");
  }

  registerRoutes() {
    this.router.get("/ping", (request, response) => {
      return response.status(200).send("pong");
    });

    this.routers.forEach((router) => {
      this.router.use(router.path, ...router.handlers);
    });

    return this.router;
  }
}
