class IndivisibleBillError extends Error {
  constructor(
    message: string,
    public readonly bill: number,
    public readonly members: number,
    public readonly calculated: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { IndivisibleBillError };
