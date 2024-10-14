interface ResultLike<T extends boolean> {
  success: T;
}

interface Success<T> extends ResultLike<true> {
  data: T;
}

interface Failure<E> extends ResultLike<false> {
  error: E;
}

type Result<T, E> = Success<T> | Failure<E>;

export type { ResultLike, Success, Failure, Result };
