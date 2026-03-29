/* global vi */

import { createShutdownHandler } from '../server.js';

const createPendingPromise = (): Promise<never> => Promise.race([]);
type ShutdownHandler = ReturnType<typeof createShutdownHandler>;
type ShutdownTargetServer = Parameters<ShutdownHandler>[0];
type ShutdownInjector = Parameters<ShutdownHandler>[1];
type ShutdownContext = Parameters<ShutdownHandler>[2];

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

describe('createShutdownHandler', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('shutdown が timeout した場合は exit code 1 で強制終了する', async () => {
    vi.useFakeTimers();

    const exitProcess = vi.fn();
    const shutdownHandler = createShutdownHandler({
      closeServer: () => createPendingPromise(),
      exitProcess,
      shutdownTimeoutMs: 10,
    });
    const dispose: ShutdownInjector['dispose'] = vi.fn(() =>
      createPendingPromise(),
    );
    const injector = createInjectorStub(dispose);
    const server = createServerStub();

    const shutdownPromise = shutdownHandler(
      server,
      injector,
      createShutdownContext(),
    );
    await vi.advanceTimersByTimeAsync(10);

    expect(shutdownPromise).toBeInstanceOf(Promise);
    expect(dispose).not.toHaveBeenCalled();
    expect(exitProcess).toHaveBeenCalledWith(1);
  });

  it('timeout 後に shutdown 処理が完了しても exit は二重実行しない', async () => {
    vi.useFakeTimers();

    let resolveCloseServer: (() => void) | undefined;
    const closeServer = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveCloseServer = resolve;
        }),
    );
    const exitProcess = vi.fn();
    const shutdownHandler = createShutdownHandler({
      closeServer,
      exitProcess,
      shutdownTimeoutMs: 10,
    });
    const injector = createInjectorStub();
    const server = createServerStub();

    const shutdownPromise = shutdownHandler(
      server,
      injector,
      createShutdownContext(),
    );
    await vi.advanceTimersByTimeAsync(10);
    resolveCloseServer?.();
    await shutdownPromise;

    expect(exitProcess).toHaveBeenCalledTimes(1);
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
    const shutdownHandler = createShutdownHandler({
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

    await shutdownHandler(server, injector, createShutdownContext());

    expect(closeServer).toHaveBeenCalledTimes(1);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(callOrder).toStrictEqual(['closeServer', 'dispose']);
    expect(exitProcess).toHaveBeenCalledWith(0);
  });
});
