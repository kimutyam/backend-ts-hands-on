/* global vi */

import { createShutdownHandler } from '#/entryPoint/primary/shopping/web/server.js';

const createPendingPromise = (): Promise<never> => Promise.race([]);
type ShutdownHandlerDeps = Parameters<typeof createShutdownHandler>[0];
type ShutdownTargetServer = ShutdownHandlerDeps['server'];
type ShutdownInjector = ShutdownHandlerDeps['injector'];
type ShutdownHandler = ReturnType<typeof createShutdownHandler>;
type ShutdownContext = Parameters<ShutdownHandler>[0];

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
  code: 0,
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
    const dispose: ShutdownInjector['dispose'] = vi.fn(() =>
      createPendingPromise(),
    );
    const injector = createInjectorStub(dispose);
    const server = createServerStub();
    const shutdownHandler = createShutdownHandler({
      server,
      injector,
      closeServer: () => createPendingPromise(),
      exitProcess,
      shutdownTimeoutMs: 10,
    });

    shutdownHandler(createShutdownContext());
    await vi.advanceTimersByTimeAsync(10);

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
    const injector = createInjectorStub();
    const server = createServerStub();
    const shutdownHandler = createShutdownHandler({
      server,
      injector,
      closeServer,
      exitProcess,
      shutdownTimeoutMs: 10,
    });

    shutdownHandler(createShutdownContext());
    await vi.advanceTimersByTimeAsync(10);
    resolveCloseServer?.();
    await vi.waitFor(() => {
      expect(injector.dispose).toHaveBeenCalledTimes(1);
    });

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
    const dispose: ShutdownInjector['dispose'] = vi.fn(() =>
      Promise.resolve().then(() => {
        callOrder.push('dispose');
      }),
    );
    const injector = createInjectorStub(dispose);
    const server = createServerStub();
    const shutdownHandler = createShutdownHandler({
      server,
      injector,
      closeServer,
      exitProcess,
      shutdownTimeoutMs: 10,
    });

    shutdownHandler(createShutdownContext());
    await vi.waitFor(() => {
      expect(exitProcess).toHaveBeenCalledWith(0);
    });

    expect(closeServer).toHaveBeenCalledTimes(1);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(callOrder).toStrictEqual(['closeServer', 'dispose']);
    expect(exitProcess).toHaveBeenCalledWith(0);
  });

  it('shutdown が複数回要求されても終了処理は一度だけ実行する', async () => {
    const closeServer = vi.fn(() => Promise.resolve());
    const exitProcess = vi.fn();
    const injector = createInjectorStub();
    const server = createServerStub();
    const shutdownHandler = createShutdownHandler({
      server,
      injector,
      closeServer,
      exitProcess,
    });

    shutdownHandler(createShutdownContext());
    shutdownHandler(createShutdownContext({ reason: 'SIGINT' }));
    await vi.waitFor(() => {
      expect(exitProcess).toHaveBeenCalledTimes(1);
    });

    expect(closeServer).toHaveBeenCalledTimes(1);
    expect(injector.dispose).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledTimes(1);
  });
});
