import { DiscriminatedError } from 'ch3/ex3234/discriminatedError.js';

const NumberOfMembersErrorKind = 'NumberOfMembersError';
class NumberOfMembersError extends DiscriminatedError<
  typeof NumberOfMembersErrorKind
> {
  constructor(
    message: string,
    public readonly members: number,
    options?: ErrorOptions,
  ) {
    super(message, NumberOfMembersErrorKind, options);
  }
}

export { NumberOfMembersError, NumberOfMembersErrorKind };
