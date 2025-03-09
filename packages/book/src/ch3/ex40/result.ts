interface ResultLike<S extends boolean> {
  readonly success: S;
}

interface Success<T> extends ResultLike<true> {
  readonly data: T;
}

interface Failure<E> extends ResultLike<false> {
  readonly error: E;
}

const Success = <T>(data: T): Success<T> => ({
  success: true,
  data,
});

const Failure = <E>(error: E): Failure<E> => ({
  success: false,
  error,
});

type Result<T, E> = Success<T> | Failure<E>;

export { Success, Failure, type Result };
