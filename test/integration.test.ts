import { expect } from "chai";
import type { Express } from "express";
import request from "supertest";
import { App } from "../src/app";
import { GlobalErrorHandlerMiddleware } from "../src/middlewares/globalErrorHandler.middleware";
import { AppRouter } from "../src/router";
import { LoggerUtil } from "../src/utils/logger.util";

describe("Integration Tests", () => {
  let appInstance: Express;

  before(async () => {
    const logger = new LoggerUtil("integration-test").logger;
    const globalErrorHandlerMiddleware = new GlobalErrorHandlerMiddleware({
      logger,
    });
    const appRouter = new AppRouter({ logger });
    const host = "0.0.0.0";
    const port = 8080;

    const app = new App({
      appRouter,
      globalErrorHandlerMiddleware,
      host,
      logger,
      port,
    });
    appInstance = await app.initialize();
  });

  it("should return status 200 and a 'pong' for GET /ping", async () => {
    const response = await request(appInstance).get("/ping");
    expect(response.status).to.be.equal(200);
    expect(response.text).to.be.equal("pong");
  });

  it("should return status 404 for an invalid endpoint", async () => {
    const response = await request(appInstance).get("/nonexistent");
    expect(response.status).to.be.equal(404);
  });
});
