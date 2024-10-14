interface GameResultLike<T extends string> {
  result: T;
}

interface Win extends GameResultLike<'win'> {
  points: number;
}

interface Lose extends GameResultLike<'lose'> {
  penalty: number;
}

interface Draw extends GameResultLike<'draw'> {}

type GameResult = Win | Lose | Draw;

export type { GameResult, Win, Lose, Draw };
