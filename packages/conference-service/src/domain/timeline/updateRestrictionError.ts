import type { TimelineStatus } from './status';
import type { TimelineUpdates } from './timeline';

export type UpdateRestrictionError = Readonly<{
  kind: string;
  status: TimelineStatus;
  updates: TimelineUpdates;
  description: string;
}>;

export const UpdateRestrictionError = (
  status: TimelineStatus,
  updates: TimelineUpdates,
  description: string,
): UpdateRestrictionError => ({
  kind: 'UpdateError',
  status,
  updates,
  description,
});
