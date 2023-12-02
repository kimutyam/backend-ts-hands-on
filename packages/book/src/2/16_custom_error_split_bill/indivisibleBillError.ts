export class IndivisibleBillError extends Error {
  constructor(
    message: string,
    public calculated: number,
  ) {
    super(message);
    this.name = 'IndivisibleBillError';
  }
}
