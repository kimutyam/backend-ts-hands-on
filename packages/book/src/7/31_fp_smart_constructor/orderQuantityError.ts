export class OrderQuantityError extends Error {
  constructor(
    message: string,
    public descriptions: Array<string>,
  ) {
    super(message);
    this.name = 'OrderQuantityError';
  }

  static build(descriptions: Array<string>): OrderQuantityError {
    return new OrderQuantityError(descriptions.join('\n'), descriptions);
  }
}
