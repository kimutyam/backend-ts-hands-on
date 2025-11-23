import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  readonly requestId: string;
  readonly executionPort: 'management' | 'shopping';
}

const storage = new AsyncLocalStorage<RequestContext>();

const runWithRequestContext = <T>(
  ctx: RequestContext,
  fn: () => Promise<T>,
): Promise<T> => storage.run(ctx, fn);

const getRequestContext = (): Partial<RequestContext> =>
  storage.getStore() ?? {};

export { runWithRequestContext, getRequestContext };
