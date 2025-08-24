import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';

interface Period {
  start: Date;
  end: Date;
}

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isWithin = (period: Period, dateToCompare: Date): boolean => {
  const { start, end } = period;
  return (
    isSameOrAfter(start, dateToCompare) && isSameOrBefore(end, dateToCompare)
  );
};

const postpone = (
  period: Period,
  delayDays: number,
  delayHours: number,
): void => {
  // eslint-disable-next-line no-param-reassign
  period.start = addHours(addDays(period.start, delayDays), delayHours);
  // eslint-disable-next-line no-param-reassign
  period.end = addHours(addDays(period.end, delayDays), delayHours);
};

interface CampaignPeriod {
  readonly campaignId: string;
  readonly period: Period;
}

const period = {
  start: new Date(2024, 6, 1), // 7月1日
  end: new Date(2024, 6, 31), // 7月31日
};

const campaignPeriod: CampaignPeriod = {
  campaignId: 'campaign-123',
  period,
};

postpone(campaignPeriod.period, 3, 0); // 7月4日〜8月3日 に変更

const isValid = isWithin(campaignPeriod.period, new Date(2024, 6, 2)); // false（本来は true のはず）

console.log('isWithin:', isValid);
console.log('start:', campaignPeriod.period.start);
console.log('end:', campaignPeriod.period.end);
