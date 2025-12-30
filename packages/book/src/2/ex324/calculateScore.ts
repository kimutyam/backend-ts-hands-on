import type { GameResult } from '../ex327/gameResult.js';

const calculateScore = (result: GameResult): number => {
  switch (result.tag) {
    case 'win':
      return result.points;
    case 'lose':
      return -result.penalty;
    default: {
      // neverにdrawを割り当てられない
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
    }
  }
};

export { calculateScore };
