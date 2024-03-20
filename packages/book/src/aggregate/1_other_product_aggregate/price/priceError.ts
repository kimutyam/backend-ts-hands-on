export class PriceError extends Error {
  constructor(
    message: string,
    public descriptions: Array<string>,
  ) {
    super(message);
    this.name = 'PriceError';
  }

  static build(descriptions: Array<string>): PriceError {
    return new PriceError(descriptions.join('\n'), descriptions);
  }
}
