import { promisify } from 'node:util';

import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { Injector } from 'typed-inject';

import type { App } from '#/entryPoint/primary/shopping/web/app.js';

type ClosableServer = Pick<ServerType, 'close'>;
type DisposableInjector = Pick<Injector, 'dispose'>;

const serveApp = (app: App): ServerType =>
  serve(
    {
      fetch: app.fetch,
      port: 3000,
    },
    (info) => {
      console.log(`Server is running on ${info.port.toString()}`);
    },
  );

const SHUTDOWN_TIMEOUT_MS = 10_000;

type ShutdownHandlerDeps = {
  closeServer?: (server: ClosableServer) => Promise<void>;
  exitProcess?: (code: number) => void;
  shutdownTimeoutMs?: number;
};

type ShutdownContext = {
  reason: string;
  code?: number;
};

const closeServer = async (server: ClosableServer): Promise<void> => {
  await promisify(server.close.bind(server))();
  console.log('HTTP server closed.');
};

const createShutdownHandler = ({
  closeServer: closeServerFn = closeServer,
  exitProcess = process.exit.bind(process),
  shutdownTimeoutMs = SHUTDOWN_TIMEOUT_MS,
}: ShutdownHandlerDeps = {}) => {
  let shutdownPromise: Promise<void> | undefined;

  return (
    server: ClosableServer,
    injector: DisposableInjector,
    { reason, code = 0 }: ShutdownContext,
  ): Promise<void> => {
    if (shutdownPromise !== undefined) {
      console.log(`[${reason}] shutdown already in progress.`);
      return shutdownPromise;
    }

    const runShutdown = async (): Promise<void> => {
      console.log(`[${reason}] shutting down...`);
      let exitCode = code;
      let exited = false;

      const exitOnce = (nextExitCode: number): void => {
        if (exited) {
          return;
        }
        exited = true;
        exitProcess(nextExitCode);
      };

      const timeoutId = setTimeout(() => {
        console.error(
          `Shutdown timed out after ${shutdownTimeoutMs.toString()}ms. Forcing exit.`,
        );
        exitOnce(exitCode === 0 ? 1 : exitCode);
      }, shutdownTimeoutMs);

      try {
        await closeServerFn(server);
        await injector.dispose();
      } catch (error) {
        console.error('Error occurred during shutdown:', error);
        exitCode = 1;
      } finally {
        clearTimeout(timeoutId);
        exitOnce(exitCode);
      }
    };

    shutdownPromise = runShutdown();

    return shutdownPromise;
  };
};

const createShutdownStarter =
  (
    server: ClosableServer,
    injector: DisposableInjector,
    shutdownHandler = createShutdownHandler(),
  ) =>
  (context: ShutdownContext): void => {
    shutdownHandler(server, injector, context).catch((error: unknown) => {
      console.error('Unexpected error during shutdown:', error);
    });
  };

export { serveApp, createShutdownHandler, createShutdownStarter };
