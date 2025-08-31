class IndivisibleBillError extends Error {
  constructor(
    public readonly bill: number,
    public readonly members: number,
    public readonly calculated: number,
    options?: ErrorOptions,
  ) {
    super('割り切れません', options);
    this.name = this.constructor.name;
  }
}

export { IndivisibleBillError };
