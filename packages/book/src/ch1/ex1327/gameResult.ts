interface GameResultLike<T extends string> {
  tag: T;
}

interface Win extends GameResultLike<'win'> {
  points: number;
}

interface Lose extends GameResultLike<'lose'> {
  penalty: number;
}

type Draw = GameResultLike<'draw'>;

type GameResult = Win | Lose | Draw;

export type { Draw, GameResult, Lose, Win };
