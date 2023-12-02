export class NumberOfMembersError extends Error {
  constructor(
    message: string,
    public members: number,
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = 'NumberOfMembersError';
  }
}
