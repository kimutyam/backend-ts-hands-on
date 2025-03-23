export class QuantityError extends Error {
  constructor(
    message: string,
    public descriptions: Array<string>,
  ) {
    super(message);
    this.name = 'QuantityError';
  }

  static build = (descriptions: Array<string>): QuantityError =>
    new QuantityError(descriptions.join('\n'), descriptions);
}
