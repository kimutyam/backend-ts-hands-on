import { DiscriminatedError } from '3_bug_error/44_result_discriminated_error/discriminatedError.js';

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
