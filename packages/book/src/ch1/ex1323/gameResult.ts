interface Win {
  tag: 'win';
  points: number;
}

interface Lose {
  tag: 'lose';
  penalty: number;
}

interface Draw {
  tag: 'draw';
}

type GameResult = Win | Lose | Draw;

export type { Draw, GameResult, Lose, Win };
