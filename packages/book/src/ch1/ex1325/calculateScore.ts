import type { GameResult } from '../ex1327/gameResult.js';

const calculateScore = (result: GameResult): number => {
  switch (result.tag) {
    case 'win':
      return result.points;
    case 'lose':
      return -result.penalty;
    case 'draw':
      return 0;
    default: {
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
    }
  }
};

const winResult: GameResult = {
  tag: 'win',
  points: 100,
};
const loseResult: GameResult = {
  tag: 'lose',
  penalty: 50,
};
const drawResult: GameResult = { tag: 'draw' };

console.log(calculateScore(winResult)); // 100
console.log(calculateScore(loseResult)); // -50
console.log(calculateScore(drawResult)); // 0

export { calculateScore };
