import { contains, postpone } from './period.js';

interface CampaignPeriod {
  readonly campaignId: string;
  readonly start: Date;
  readonly end: Date;
}

// データ構造に互換性があるのでそのまま使える
// Periodクラスのメソッドで定義されている場合は、Periodを移譲して使うことになるが、
// そういったデータ構造の関連性を整備しなくても、関数を使用するかどうかだけの判断軸となる。
const containsCampaignPeriod = (
  period: CampaignPeriod,
  dateToCompare: Date,
): boolean => contains(period, dateToCompare);

// Periodを移譲しなくても、利用できる
const postponeCampaign = (
  campaign: CampaignPeriod,
  delayDays: number,
): CampaignPeriod => {
  const { campaignId, start, end } = campaign;
  const period = postpone(
    {
      start,
      end,
    },
    delayDays,
    1,
  );
  return {
    campaignId,
    start: period.start,
    end: period.end,
  };
};

const campaign = {
  campaignId: 'campaign-123',
  start: new Date(2024, 6, 1),
  end: new Date(2024, 6, 30),
};

contains(campaign, new Date(2024, 6, 15)); // true

// 他方、「CampaignPeriodは延期してはならない」などの変更が入っても気にする必要がない

console.log(containsCampaignPeriod, postponeCampaign);

export { type CampaignPeriod };
