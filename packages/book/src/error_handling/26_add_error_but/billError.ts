export class BillError extends Error {
  constructor(
    message: string,
    public bill: number,
  ) {
    super(message);
    this.name = 'BillError';
  }
}
