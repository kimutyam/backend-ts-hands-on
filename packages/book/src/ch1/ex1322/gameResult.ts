interface Win {
  result: 'win';
  points: number;
}

interface Lose {
  result: 'lose';
  penalty: number;
}

type GameResult = Win | Lose;

export type { GameResult, Lose, Win };
