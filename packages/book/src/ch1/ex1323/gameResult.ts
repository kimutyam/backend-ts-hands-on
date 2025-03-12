interface Win {
  result: 'win';
  points: number;
}

interface Lose {
  result: 'lose';
  penalty: number;
}

interface Draw {
  result: 'draw';
}

type GameResult = Win | Lose | Draw;

export type { Draw, GameResult, Lose, Win };
