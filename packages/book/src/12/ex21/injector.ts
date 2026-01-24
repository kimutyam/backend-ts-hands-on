import { createInjector } from 'typed-inject';

import { Logger } from './logger.js';
import { Request } from './request.js';
import { Url } from './url.js';

const createAppInjector = () =>
  // 1
  createInjector()
    .provideValue(Url.token, 'https://example.com')
    .provideFactory(Request.token, Request.create)
    .provideFactory(Logger.token, Logger.create);

export { createAppInjector };
