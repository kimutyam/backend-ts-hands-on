export abstract class DiscriminatedError<Kind extends string> extends Error {
  protected constructor(
    message: string,
    public kind: Kind,
  ) {
    super(message);
    this.name = kind;
  }
}
