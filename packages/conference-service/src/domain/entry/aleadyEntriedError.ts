import type { ApplicationError } from '../../util/applicationError';
import type { WithAggregateId } from '../../util/resolver';
import type { Entry } from './entry';
import type { EntryId } from './entryId';

const kind = 'AlreadyEnteredError';
export type AlreadyEnteredError = ApplicationError<typeof kind, Readonly<WithAggregateId<EntryId>>>;
export const AlreadyEnteredError = (entry: Entry): AlreadyEnteredError => ({
  kind,
  message: '既に応募しています',
  detail: entry,
});
