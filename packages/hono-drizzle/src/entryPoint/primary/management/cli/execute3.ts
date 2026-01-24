import type { CommandHandler } from '../../../../adapter/primary/management/cli/commandHandler.js';
import type { Db } from '../../../../adapter/secondary/persistence/rdb/db.js';

interface FileHandler {
  close: () => Promise<void>;
}

const execute =
  <Args>(handler: CommandHandler<Args>, db?: Db, fileHandler?: FileHandler) =>
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
      await db?.$client.end();
      await fileHandler?.close();
    }
  };

export { execute };
