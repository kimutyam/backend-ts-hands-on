import { DiscriminatedError } from './discriminatedError';

export const NumberOfMembersErrorKind = 'NumberOfMemberError';
export class NumberOfMembersError extends DiscriminatedError<typeof NumberOfMembersErrorKind> {
  constructor(
    message: string,
    public members: number,
  ) {
    super(message, NumberOfMembersErrorKind);
  }
}
