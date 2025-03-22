class IndivisibleBillError extends Error {
  constructor(
    public readonly bill: number,
    public readonly members: number,
    public readonly calculated: number,
  ) {
    super('The bill cannot be divided evenly');
    this.name = this.constructor.name;
  }
}

export { IndivisibleBillError };
