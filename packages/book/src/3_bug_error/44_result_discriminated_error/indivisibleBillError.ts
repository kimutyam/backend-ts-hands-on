import { DiscriminatedError } from '3_bug_error/44_result_discriminated_error/discriminatedError.js';

const IndivisibleBillErrorKind = 'IndivisibleBillError';
class IndivisibleBillError extends DiscriminatedError<
  typeof IndivisibleBillErrorKind
> {
  constructor(
    message: string,
    public calculated: number,
  ) {
    super(message, IndivisibleBillErrorKind);
  }
}

export { IndivisibleBillError, IndivisibleBillErrorKind };
