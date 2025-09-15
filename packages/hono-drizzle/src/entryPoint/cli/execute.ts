import type { Injector } from 'typed-inject';

import type { CommandHandler } from '../../adapter/primary/cli/commandHandler.js';

const execute =
  <Args>(handler: CommandHandler<Args>, injector: Injector) =>
  async (args: Args): Promise<void> => {
    try {
      await handler(args);
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      console.log('Disposing injector...');
      await injector.dispose();
    }
  };

export { execute };
