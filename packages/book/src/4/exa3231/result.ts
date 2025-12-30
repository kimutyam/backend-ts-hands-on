interface ResultLike<S extends boolean> {
  readonly ok: S;
}

interface Ok<T> extends ResultLike<true> {
  readonly data: T;
}

interface Err<E> extends ResultLike<false> {
  readonly error: E;
}

const Ok = <T>(data: T): Ok<T> => ({
  ok: true,
  data,
});

const Err = <E>(error: E): Err<E> => ({
  ok: false,
  error,
});

type Result<T, E> = Ok<T> | Err<E>;

export { Err, type Result, Ok };
