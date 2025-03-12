import type { GameResult } from 'ch1/ex1327/gameResult.js';

const calculateScore = (result: GameResult): number => {
  switch (result.result) {
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
  result: 'win',
  points: 100,
};
const loseResult: GameResult = {
  result: 'lose',
  penalty: 50,
};
const drawResult: GameResult = { result: 'draw' };

console.log(calculateScore(winResult)); // 100
console.log(calculateScore(loseResult)); // -50
console.log(calculateScore(drawResult)); // 0

export { calculateScore };
