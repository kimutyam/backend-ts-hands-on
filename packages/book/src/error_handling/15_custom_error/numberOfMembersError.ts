export class NumberOfMembersError extends Error {
  constructor(
    message: string,
    public members: number,
  ) {
    super(message);
    this.name = 'NumberOfMembersError';
  }
}
