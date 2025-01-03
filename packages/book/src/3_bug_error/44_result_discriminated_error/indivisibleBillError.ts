import { DiscriminatedError } from './discriminatedError';

const IndivisibleBillErrorKind = 'IndivisibleBillError';
class IndivisibleBillError extends DiscriminatedError<typeof IndivisibleBillErrorKind> {
  constructor(
    message: string,
    public calculated: number,
  ) {
    super(message, IndivisibleBillErrorKind);
  }
}

export { IndivisibleBillError, IndivisibleBillErrorKind };
