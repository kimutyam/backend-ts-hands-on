import { createInjector, type Injector } from 'typed-inject';

import { Logger } from './logger.js';
import { QueueLogger } from './queueLogger.js';
import { Request } from './request.js';
import { Url } from './url.js';

// 1
const createRootInjector = (): Injector => createInjector();

// 2
const createChildInjector = (injector: Injector) =>
  injector
    .provideValue(Url.token, 'https://example.com')
    .provideFactory(Request.token, Request.create)
    // 3
    .provideClass(Logger.token, QueueLogger);

export { createRootInjector, createChildInjector };
