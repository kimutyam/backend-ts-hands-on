import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  readonly requestId: string;
  readonly primaryPort: 'management' | 'shopping';
}

const storage = new AsyncLocalStorage<RequestContext>();

const runWith = <T>(ctx: RequestContext, fn: () => Promise<T>): Promise<T> =>
  storage.run(ctx, fn);

const get = (): RequestContext | undefined => storage.getStore();

const RequestContext = {
  runWith,
  get,
} as const;

export { RequestContext };
