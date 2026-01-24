import type { Injector } from 'typed-inject';

import type { CommandHandler } from '../../../../adapter/primary/management/cli/commandHandler.js';

const execute =
  <Args>(handler: CommandHandler<Args>, injector: Injector) =>
  async (args: Args): Promise<void> => {
    try {
      await handler(args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error('An unknown error occurred');
      }
    } finally {
      await injector.dispose();
    }
  };

export { execute };
