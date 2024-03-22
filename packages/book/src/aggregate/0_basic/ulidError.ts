export class UlidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UlidError';
  }
}
