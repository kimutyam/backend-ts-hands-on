import { promisify } from 'node:util';

import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { Injector } from 'typed-inject';

import type { App } from '#/entryPoint/primary/shopping/web/app.js';

type ClosableServer = Pick<ServerType, 'close'>;
type DisposableInjector = Pick<Injector, 'dispose'>;
interface ShutdownHandlerDeps {
  server: ClosableServer;
  injector: DisposableInjector;
  closeServer?: (server: ClosableServer) => Promise<void>;
  exitProcess?: (code: number) => void;
  shutdownTimeoutMs?: number;
}

interface ShutdownContext {
  reason: string;
  code: number;
}

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

const closeServer = async (server: ClosableServer): Promise<void> => {
  await promisify(server.close.bind(server))();
  console.log('HTTP server closed.');
};

const createShutdownHandler = ({
  server,
  injector,
  closeServer: closeServerFn = closeServer,
  exitProcess = process.exit.bind(process),
  shutdownTimeoutMs = 10_000,
}: ShutdownHandlerDeps) => {
  let shutdownPromise: Promise<void> | undefined;

  return ({ reason, code }: ShutdownContext): void => {
    if (shutdownPromise !== undefined) {
      console.log(`[${reason}] shutdown already in progress.`);
      return;
    }

    const runShutdown = async (): Promise<void> => {
      console.log(`[${reason}] shutting down...`);
      let exitCode = code;
      const state = { timedOut: false };

      const timeoutId = setTimeout(() => {
        state.timedOut = true;
        console.error(
          `Shutdown timed out after ${shutdownTimeoutMs.toString()}ms. Forcing exit.`,
        );
        exitProcess(exitCode === 0 ? 1 : exitCode);
      }, shutdownTimeoutMs);

      try {
        await closeServerFn(server);
        await injector.dispose();
      } catch (error) {
        console.error('Error occurred during shutdown:', error);
        exitCode = 1;
      } finally {
        clearTimeout(timeoutId);
        if (!state.timedOut) {
          exitProcess(exitCode);
        }
      }
    };

    shutdownPromise = runShutdown().catch((error: unknown) => {
      console.error('Unexpected error during shutdown:', error);
    });
  };
};

export { serveApp, createShutdownHandler };
