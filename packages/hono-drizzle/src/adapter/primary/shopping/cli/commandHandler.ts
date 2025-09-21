interface CommandHandler<In> {
  (args: In): Promise<void>;
}
export type { CommandHandler };
