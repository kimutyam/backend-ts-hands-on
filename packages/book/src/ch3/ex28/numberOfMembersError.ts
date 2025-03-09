class NumberOfMembersError extends Error {
  constructor(
    message: string,
    public readonly members: number,
  ) {
    super(message);

    // ES2015より前のターゲットでErrorのプロトタイプを継承するための記述
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'NumberOfMembersError';
    // ES6より前のターゲットでErrorのプロトタイプを継承するための記述
    Object.setPrototypeOf(
      this,
      NumberOfMembersError.prototype,
    );
  }
}

export { NumberOfMembersError };
