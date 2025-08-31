abstract class DiscriminatedError<K extends string> extends Error {
  protected constructor(
    message: string,
    public readonly kind: K,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

export { DiscriminatedError };
