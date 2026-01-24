import { createInjector, Scope } from 'typed-inject';

import { Logger } from '../debug1/logger.js';
import { Request } from '../debug1/request.js';
import { Url } from '../debug1/url.js';

const injector = createInjector()
  .provideValue(Url.token, 'https://example.com')
  .provideFactory(Request.token, Request.create, Scope.Singleton)
  .provideFactory(Logger.token, Logger.create, Scope.Transient);

export { injector };
