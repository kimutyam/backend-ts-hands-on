class NumberOfMembersError extends Error {
  constructor(
    message: string,
    public readonly members: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { NumberOfMembersError };
