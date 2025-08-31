import { DiscriminatedError } from 'ch3/ex3234/discriminatedError.js';

const IndivisibleBillErrorKind = 'IndivisibleBillError';
class IndivisibleBillError extends DiscriminatedError<
  typeof IndivisibleBillErrorKind
> {
  constructor(
    message: string,
    public readonly bill: number,
    public readonly members: number,
    public readonly calculated: number,
    options?: ErrorOptions,
  ) {
    super(message, IndivisibleBillErrorKind, options);
  }
}

export { IndivisibleBillError, IndivisibleBillErrorKind };
