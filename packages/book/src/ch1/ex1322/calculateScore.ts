import type { GameResult } from 'ch1/ex1322/gameResult.js';

const calculateScore = (result: GameResult): number => {
  if (result.tag === 'win') {
    return result.points;
  }
  return -result.penalty;
};

const winResult: GameResult = {
  tag: 'win',
  points: 100,
};
const loseResult: GameResult = {
  tag: 'lose',
  penalty: 50,
};

console.log(calculateScore(winResult)); // 100
console.log(calculateScore(loseResult)); // -50

export { calculateScore };
