interface GameResultLike<T extends string> {
  result: T;
}

interface Win extends GameResultLike<'win'> {
  points: number;
}

interface Lose extends GameResultLike<'lose'> {
  penalty: number;
}

type GameResult = Win | Lose;

export type { GameResult, Win, Lose };
