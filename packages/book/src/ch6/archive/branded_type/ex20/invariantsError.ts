export class InvariantsError<T> extends Error {
  constructor(
    public issues: ReadonlyArray<string>,
    public value: T,
  ) {
    const message = issues.join('\n');
    super(message);
    this.name = this.constructor.name;
  }
}
