import { isAfter, isBefore, isEqual, addDays } from 'date-fns';
import { assertNever } from '../../util/assertNever';
import type { AtLeastOne } from '../../util/atLeastOnce';
import type { InvariantsError, Nominal } from '../../util/nominal';
import { Transformer, Invariants, InvariantUnit } from '../../util/nominal';
import type { WithAggregateId } from '../../util/resolver';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { ConferenceId } from '../conference';
import type { ConferencePeriod } from './conferencePeriod';
import type { ConfirmDateTime } from './confirmDateTime';
import type { EntryPeriod } from './entryPeriod';
import type { LotteryPeriod } from './lotteryPeriod';
import { Period } from './period';
import type { TimelineStatus } from './status';
import { TIMELINE_STATUS } from './status';
import { TimelineCreated } from './timelineCreated';
import { TimelineUpdated } from './timelineUpdated';
import { UpdateRestrictionError } from './updateRestrictionError';

const name = 'Timeline';
type TimelineInner = WithAggregateId<ConferenceId> &
  Readonly<{
    entryPeriod: EntryPeriod;
    lotteryPeriod: LotteryPeriod;
    confirmDateTime: ConfirmDateTime;
    conferencePeriod: ConferencePeriod;
  }>;
export type Timeline = Nominal<typeof name, TimelineInner>;
const aggregateType = 'Timeline';

const buildInvariantUnit = InvariantUnit<Timeline>;

const invariants = Invariants.buildMulti<Timeline>(
  name,
  buildInvariantUnit(
    ({ entryPeriod, lotteryPeriod }) =>
      isBefore(entryPeriod.value.endDateTime, lotteryPeriod.value.startDateTime),
    '応募終了より抽選開始が前になっています',
  ),
  buildInvariantUnit(
    ({ lotteryPeriod, confirmDateTime }) =>
      isBefore(lotteryPeriod.value.endDateTime, addDays(confirmDateTime.value, 1)),
    '抽選終了から開催確定まで1日以上の期間を設けてください',
  ),
  buildInvariantUnit(
    ({ confirmDateTime, conferencePeriod }) =>
      isBefore(confirmDateTime.value, addDays(conferencePeriod.value.startDateTime, 1)),
    '開催確定からカンファレンス開始まで1日以上の期間を設けてください',
  ),
);

const getStatus =
  (now: Date) =>
  ({ value }: Timeline): TimelineStatus => {
    const { entryPeriod, lotteryPeriod, confirmDateTime, conferencePeriod } = value;
    if (Period.isBefore(entryPeriod.value)(now)) {
      return TIMELINE_STATUS.WaitingForEntry;
    }

    if (Period.inPeriod(entryPeriod.value)(now)) {
      return TIMELINE_STATUS.EntryIsInProgress;
    }

    if (Period.isBefore(lotteryPeriod.value)(now)) {
      return TIMELINE_STATUS.WaitingForLottery;
    }
    if (Period.isBefore(lotteryPeriod.value)(now)) {
      return TIMELINE_STATUS.LotteryIsInProgress;
    }
    if (isBefore(now, confirmDateTime.value)) {
      return TIMELINE_STATUS.WaitingForConfirm;
    }

    if (
      (isEqual(confirmDateTime.value, now) || isAfter(confirmDateTime.value, now)) &&
      isBefore(conferencePeriod.value.startDateTime, now)
    ) {
      return TIMELINE_STATUS.WaitingForStart;
    }

    if (Period.inPeriod(conferencePeriod.value)) {
      return TIMELINE_STATUS.ConferenceIsInProgress;
    }
    if (Period.isBefore(conferencePeriod.value)(now)) {
      return TIMELINE_STATUS.Finished;
    }
    throw new Error('status logic error');
  };

export type TimelineUpdates = AtLeastOne<Omit<TimelineInner, 'aggregateId'>>;
export type UpdateError = InvariantsError<Timeline> | UpdateRestrictionError;

const update =
  (now: Date) =>
  (updates: TimelineUpdates) =>
  (timeline: Timeline): Result<UpdateError, TimelineUpdated> => {
    const status = getStatus(now)(timeline);
    switch (status) {
      case TIMELINE_STATUS.WaitingForEntry:
        break;
      case TIMELINE_STATUS.EntryIsInProgress:
      case TIMELINE_STATUS.WaitingForLottery:
        if (updates.entryPeriod !== undefined) {
          return Failure(
            UpdateRestrictionError(status, updates, '応募受付開始したら「応募期間」は変更できない'),
          );
        }
        break;
      case TIMELINE_STATUS.LotteryIsInProgress:
      case TIMELINE_STATUS.WaitingForConfirm:
        if (updates.entryPeriod !== undefined || updates.lotteryPeriod !== undefined) {
          return Failure(
            UpdateRestrictionError(
              status,
              updates,
              '抽選開始したら「応募期間」と「抽選期間」は変更できない',
            ),
          );
        }
        break;
      case TIMELINE_STATUS.WaitingForStart:
      case TIMELINE_STATUS.ConferenceIsInProgress:
      case TIMELINE_STATUS.Finished:
        return Failure(
          UpdateRestrictionError(status, updates, 'カンファレンス開始待ちになったら変更できない'),
        );
      default:
        assertNever(status);
    }
    return Success(TimelineUpdated.build(timeline.value.aggregateId, updates));
  };

const enableCancel =
  (now: Date) =>
  (timeline: Timeline): [boolean, TimelineStatus] => {
    const status = getStatus(now)(timeline);
    return [status === TIMELINE_STATUS.WaitingForConfirm, status];
  };

const enableChangeRestriction =
  (now: Date) =>
  (timeline: Timeline): [boolean, TimelineStatus] => {
    const status = getStatus(now)(timeline);
    return [
      status === TIMELINE_STATUS.WaitingForEntry || status === TIMELINE_STATUS.EntryIsInProgress,
      status,
    ];
  };

const enableCallOff =
  (now: Date) =>
  (timeline: Timeline): [boolean, TimelineStatus] => {
    const status = getStatus(now)(timeline);
    return [
      status === TIMELINE_STATUS.WaitingForEntry ||
        status === TIMELINE_STATUS.EntryIsInProgress ||
        status === TIMELINE_STATUS.WaitingForLottery ||
        status === TIMELINE_STATUS.LotteryIsInProgress ||
        status === TIMELINE_STATUS.WaitingForConfirm,
      status,
    ];
  };

const enableEntry =
  (now: Date) =>
  (timeline: Timeline): [boolean, TimelineStatus] => {
    const status = getStatus(now)(timeline);
    return [status === TIMELINE_STATUS.EntryIsInProgress, status];
  };

const create = (timeline: Timeline): TimelineCreated =>
  TimelineCreated.build(timeline.value.aggregateId, timeline);

export const Timeline = {
  ...Transformer<Timeline>(name, invariants),
  enableCancel,
  enableChangeRestriction,
  enableCallOff,
  enableEntry,
  getStatus,
  create,
  update,
  aggregateType,
} as const;
