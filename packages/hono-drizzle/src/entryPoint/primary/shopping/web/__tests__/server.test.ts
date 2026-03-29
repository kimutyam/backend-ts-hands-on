/* global vi */

import { createShutdownServerFn } from '../server.js';

const createPendingPromise = (): Promise<never> => Promise.race([]);
type ShutdownServer = ReturnType<typeof createShutdownServerFn>;
type ShutdownTargetServer = Parameters<ShutdownServer>[0];
type ShutdownInjector = Parameters<ShutdownServer>[1];
type ShutdownContext = Parameters<ShutdownServer>[2];

const createServerStub = (): ShutdownTargetServer => ({
  close: vi.fn(),
});

const createInjectorStub = (
  dispose: ShutdownInjector['dispose'] = vi.fn(() => Promise.resolve()),
): ShutdownInjector => ({
  dispose,
});

const createShutdownContext = (
  overrides: Partial<ShutdownContext> = {},
): ShutdownContext => ({
  reason: 'SIGTERM',
  ...overrides,
});

describe('createShutdownServerFn', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('shutdown が timeout した場合は exit code 1 で強制終了する', async () => {
    vi.useFakeTimers();

    const exitProcess = vi.fn();
    const shutdownServer = createShutdownServerFn({
      closeServer: () => createPendingPromise(),
      exitProcess,
      shutdownTimeoutMs: 10,
    });
    const dispose: ShutdownInjector['dispose'] = vi.fn(() =>
      createPendingPromise(),
    );
    const injector = createInjectorStub(dispose);
    const server = createServerStub();

    const shutdownPromise = shutdownServer(
      server,
      injector,
      createShutdownContext(),
    );
    await vi.advanceTimersByTimeAsync(10);

    expect(shutdownPromise).toBeInstanceOf(Promise);
    expect(dispose).not.toHaveBeenCalled();
    expect(exitProcess).toHaveBeenCalledWith(1);
  });

  it('shutdown が完了した場合は指定された終了コードで終了する', async () => {
    const callOrder: Array<string> = [];
    const exitProcess = vi.fn();
    const closeServer = vi.fn(() =>
      Promise.resolve().then(() => {
        callOrder.push('closeServer');
      }),
    );
    const shutdownServer = createShutdownServerFn({
      closeServer,
      exitProcess,
      shutdownTimeoutMs: 10,
    });
    const dispose: ShutdownInjector['dispose'] = vi.fn(() =>
      Promise.resolve().then(() => {
        callOrder.push('dispose');
      }),
    );
    const injector = createInjectorStub(dispose);
    const server = createServerStub();

    await shutdownServer(server, injector, createShutdownContext());

    expect(closeServer).toHaveBeenCalledTimes(1);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(callOrder).toStrictEqual(['closeServer', 'dispose']);
    expect(exitProcess).toHaveBeenCalledWith(0);
  });
});
