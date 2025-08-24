import type { Period } from 'ch2/ex3/period.js';

class CampaignPeriod {
  constructor(
    public readonly campaignId: string,
    public readonly period: Period,
  ) {}

  isWithin(dateToCompare: Date): boolean {
    return this.period.isWithin(dateToCompare);
  }
}

export { CampaignPeriod };
