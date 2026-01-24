interface CommandHandler<in Args> {
  (args: Args): Promise<void>;
}
export type { CommandHandler };
