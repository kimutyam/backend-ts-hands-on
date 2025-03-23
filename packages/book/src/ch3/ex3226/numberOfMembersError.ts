class NumberOfMembersError extends Error {
  constructor(public readonly members: number) {
    super('2 or more people required');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, NumberOfMembersError.prototype);
  }
}

export { NumberOfMembersError };
