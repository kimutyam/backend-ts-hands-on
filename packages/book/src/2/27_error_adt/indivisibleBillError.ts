import { DiscriminatedError } from './discriminatedError';

export const IndivisibleBillErrorKind = 'IndivisibleBillError';

export class IndivisibleBillError extends DiscriminatedError<typeof IndivisibleBillErrorKind> {
  constructor(
    message: string,
    public calculated: number,
  ) {
    super(message, IndivisibleBillErrorKind);
  }
}
