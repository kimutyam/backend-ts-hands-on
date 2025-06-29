import type { GameResult } from 'ch1/ex1323/gameResult.js';

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
