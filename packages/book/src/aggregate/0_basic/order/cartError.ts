export class CartError extends Error {
  constructor(
    message: string,
    public descriptions: Array<string>,
  ) {
    super(message);
    this.name = 'CartError';
  }

  static build(descriptions: Array<string>): CartError {
    return new CartError(descriptions.join('\n'), descriptions);
  }
}
