import type { GameResult } from 'ch1/ex1327/gameResult.js';

const assertNever = (x: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`${x} is Unexpected value. Should have been never.`);
};

const calculateScore = (result: GameResult): number => {
  switch (result.tag) {
    case 'win':
      return result.points;
    case 'lose':
      return -result.penalty;
    case 'draw':
      return 0;
    default:
      return assertNever(result);
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
