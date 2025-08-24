import { CampaignPeriod } from 'ch2/ex3/campaignPeriod.js';
import { Period } from 'ch2/ex3/period.js';

const originalPeriod = Period.build(new Date(2024, 6, 1), 30); // 7月1日〜31日

// 1
const campaign = new CampaignPeriod('campaign-123', originalPeriod);

// 2
originalPeriod.postpone(3, 0); // 7月4日〜8月3日 に変更

// 3
const isWithinResult = campaign.isWithin(new Date(2024, 6, 2));

console.log(isWithinResult); // false

console.log('start:', campaign.period.startDate);
console.log('end:', campaign.period.endDate);
