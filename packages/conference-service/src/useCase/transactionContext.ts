export abstract class TransactionContext {
  abstract runTransaction<T>(fn: () => Promise<T>): Promise<T>;
}
