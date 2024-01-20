type ResultBase<S extends boolean> = Readonly<{
  success: S;
}>;

export type Success<T> = ResultBase<true> &
  Readonly<{
    data: T;
  }>;

export type Failure<E> = ResultBase<false> &
  Readonly<{
    error: E;
  }>;

export type Result<T, E> = Success<T> | Failure<E>;

export const Success = <T>(data: T): Success<T> => ({ success: true, data });

export const Failure = <E>(error: E): Failure<E> => ({
  success: false,
  error,
});

export const fromThrowable = <T, E extends Error>(
  f: () => T,
  onThrow: (e: unknown) => E,
): Result<T, E> => {
  try {
    const value = f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};

export const fromPromise = async <T, E extends Error>(
  f: () => Promise<T>,
  onThrow: (e: unknown) => E,
): Promise<Result<T, E>> => {
  try {
    const value = await f();
    return Success<T>(value);
  } catch (err) {
    return Failure<E>(onThrow(err));
  }
};
