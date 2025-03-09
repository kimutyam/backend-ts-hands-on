import type { GameResult } from '1_type_system/64_discriminated_union/gameResult.js';

const calculateScore = (result: GameResult): number => {
  if (result.result === 'win') {
    return result.points;
  }
  // drawからpenaltyを取得するとエラーになる
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return -result.penalty;
};

export { calculateScore };
