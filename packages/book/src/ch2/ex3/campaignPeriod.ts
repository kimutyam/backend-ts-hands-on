import type { Period } from './period.js';

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
