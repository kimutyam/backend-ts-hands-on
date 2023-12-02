import { DiscriminatedError } from './discriminatedError';

export const BillErrorKind = 'BillError';
export class BillError extends DiscriminatedError<typeof BillErrorKind> {
  constructor(
    message: string,
    public bill: number,
  ) {
    super(message, BillErrorKind);
  }
}
