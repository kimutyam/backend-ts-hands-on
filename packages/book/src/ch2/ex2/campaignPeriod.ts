import { Period } from '../ex1/period.js';

class CampaignPeriod {
  private readonly period: Period;

  constructor(
    public readonly campaignId: string,
    public readonly start: Date,
    public readonly end: Date,
  ) {
    // 1
    this.period = new Period(start, end);
  }

  isWithin(dateToCompare: Date): boolean {
    return this.period.isWithin(dateToCompare);
  }
}

export { CampaignPeriod };
