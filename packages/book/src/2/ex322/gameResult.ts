interface Win {
  tag: 'win';
  points: number;
}

interface Lose {
  tag: 'lose';
  penalty: number;
}

type GameResult = Win | Lose;

export type { GameResult, Lose, Win };
