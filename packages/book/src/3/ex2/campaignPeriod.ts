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

  contains(dateToCompare: Date): boolean {
    return this.period.contains(dateToCompare);
  }
}

export { CampaignPeriod };
