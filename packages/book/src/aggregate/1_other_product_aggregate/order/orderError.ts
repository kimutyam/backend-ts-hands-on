export class OrderError extends Error {
  constructor(
    message: string,
    public descriptions: Array<string>,
  ) {
    super(message);
    this.name = 'OrderError';
  }

  static build(descriptions: Array<string>): OrderError {
    return new OrderError(descriptions.join('\n'), descriptions);
  }
}
