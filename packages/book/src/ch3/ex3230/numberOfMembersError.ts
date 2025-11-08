import { DiscriminatedError } from './discriminatedError.js';

const NumberOfMembersErrorKind = 'NumberOfMemberError';
class NumberOfMembersError extends DiscriminatedError<
  typeof NumberOfMembersErrorKind
> {
  constructor(
    message: string,
    public members: number,
  ) {
    super(message, NumberOfMembersErrorKind);
  }
}

export { NumberOfMembersError, NumberOfMembersErrorKind };
