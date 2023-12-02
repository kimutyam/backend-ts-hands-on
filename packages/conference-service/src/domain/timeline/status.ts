export const TIMELINE_STATUS = {
  WaitingForEntry: '応募待ち',
  EntryIsInProgress: '応募受付中',
  WaitingForLottery: '抽選待ち',
  LotteryIsInProgress: '抽選中',
  WaitingForConfirm: 'カンファレンス確定待ち',
  WaitingForStart: 'カンファレンス開始待ち',
  ConferenceIsInProgress: 'カンファレンス中',
  Finished: 'カンファレンス終了済み',
} as const;

export type TimelineStatus = (typeof TIMELINE_STATUS)[keyof typeof TIMELINE_STATUS];
