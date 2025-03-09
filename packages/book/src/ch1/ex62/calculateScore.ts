import type { GameResult } from 'ch1/ex62/gameResult.js';

const calculateScore = (result: GameResult): number => {
  if (result.result === 'win') {
    return result.points;
  }
  return -result.penalty;
};

const winResult: GameResult = {
  result: 'win',
  points: 100,
};
const loseResult: GameResult = {
  result: 'lose',
  penalty: 50,
};

console.log(calculateScore(winResult)); // 100
console.log(calculateScore(loseResult)); // -50

export { calculateScore };
