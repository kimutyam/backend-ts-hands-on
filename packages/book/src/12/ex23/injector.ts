import { createInjector, Scope } from 'typed-inject';

import { Logger } from '../ex21/logger.js';
import { Request } from '../ex21/request.js';
import { Url } from '../ex21/url.js';

const injector = createInjector()
  .provideValue(Url.token, 'https://example.com')
  .provideFactory(Request.token, Request.create, Scope.Singleton)
  .provideFactory(Logger.token, Logger.create, Scope.Transient);

export { injector };
