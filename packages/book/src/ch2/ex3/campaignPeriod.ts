import type { Period } from './period.js';

class CampaignPeriod {
  constructor(
    public readonly campaignId: string,
    public readonly period: Period,
  ) {}

  contains(dateToCompare: Date): boolean {
    return this.period.contains(dateToCompare);
  }
}

export { CampaignPeriod };
