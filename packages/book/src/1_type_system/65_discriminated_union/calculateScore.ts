import type { GameResult } from '../64_discriminated_union/gameResult';

const calculateScore = (result: GameResult): number => {
  switch (result.result) {
    case 'win':
      return result.points;
    case 'lose':
      return -result.penalty;
    default: {
      // neverにdrawを割り当てられない
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
    }
  }
};

export { calculateScore };
