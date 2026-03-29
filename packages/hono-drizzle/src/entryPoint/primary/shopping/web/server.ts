import { promisify } from 'node:util';

import type { ServerType } from '@hono/node-server';
import { serve } from '@hono/node-server';
import type { Injector } from 'typed-inject';

import type { App } from './app.js';

type ClosableServer = Pick<ServerType, 'close'>;
type DisposableInjector = Pick<Injector, 'dispose'>;

const bootServer = (app: App): ServerType =>
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

const resolveTimeoutExitCode = (exitCode: number): number =>
  exitCode === 0 ? 1 : exitCode;

const closeServer = async (server: ClosableServer): Promise<void> => {
  await promisify(server.close.bind(server))();
  console.log('HTTP server closed.');
};

const createShutdownServerFn = ({
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

      const timeoutId = setTimeout(() => {
        console.error(
          `Shutdown timed out after ${shutdownTimeoutMs.toString()}ms. Forcing exit.`,
        );
        exitProcess(resolveTimeoutExitCode(exitCode));
      }, shutdownTimeoutMs);
      timeoutId.unref();

      try {
        await closeServerFn(server);
        await injector.dispose();
      } catch (error) {
        console.error('Error occurred during shutdown:', error);
        exitCode = 1;
      } finally {
        clearTimeout(timeoutId);
        exitProcess(exitCode);
      }
    };

    shutdownPromise = runShutdown();

    return shutdownPromise;
  };
};

export { bootServer, createShutdownServerFn };
