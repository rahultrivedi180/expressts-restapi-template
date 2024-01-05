import type { Router } from 'express';
import type { Logger } from 'winston';

export interface CommonDependencies {
  logger: Logger;
}

export abstract class CommonDependencyInjector {
  protected commonDependencies: CommonDependencies;
  
  constructor(commonDependencies: CommonDependencies) {
    this.commonDependencies = commonDependencies;
  }
}

export abstract class CommonDependencyInjectorWithRoutes extends CommonDependencyInjector {
  constructor(commonDependencies: CommonDependencies) {
    super(commonDependencies);
  }

  abstract registerRoutes(): Router;
}