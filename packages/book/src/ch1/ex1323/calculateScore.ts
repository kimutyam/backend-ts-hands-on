import type { GameResult } from './gameResult.js';

const calculateScore = (result: GameResult): number => {
  if (result.tag === 'win') {
    return result.points;
  }
  // drawからpenaltyを取得するとエラーになる
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return -result.penalty;
};

export { calculateScore };
