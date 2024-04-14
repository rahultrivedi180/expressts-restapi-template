import compression from "compression";
import cors from "cors";
import express from "express";
import { CommonDependencyInjector } from "./common/commonDependencyInjector";
import type { AppDependencies } from "./interfaces/dependencyInterfaces";

export class App extends CommonDependencyInjector {
  private appRouter;
  private globalErrorHandlerMiddleware;
  private host;
  private port;
  private logger;

  constructor(appDependencies: AppDependencies) {
    const {
      appRouter,
      globalErrorHandlerMiddleware,
      host,
      logger,
      port
    } = appDependencies;
    super({ logger });
    this.appRouter = appRouter;
    this.globalErrorHandlerMiddleware = globalErrorHandlerMiddleware;
    this.host = host;
    this.logger = logger;
    this.port = port;
  }

  async initialize() {
    const app = express();
    app.set("host", this.host);
    app.set("port", this.port);

    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((request, response, nextFunction) => {
      const timestamp = new Date().toISOString();
      const method = request.method;
      const url = request.url;

      this.logger.info(`[${timestamp}] ${method} ${url}`);
      nextFunction();
    });

    const router = this.appRouter.registerRoutes();
    app.use("/", router);
    app.use(this.globalErrorHandlerMiddleware.handle);

    this.logger.info('The app has been initialized.');

    return app;
  }
}
