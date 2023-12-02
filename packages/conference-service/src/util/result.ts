export type Success<T> = Readonly<{
  success: true;
  data: T;
}>;

export const Success = <T>(data: T): Success<T> => ({ success: true, data });
export type Failure<E> = Readonly<{
  success: false;
  error: E;
}>;
export const Failure = <E extends { kind: string }>(error: E): Failure<E> => ({
  success: false,
  error,
});

export type Result<E, T> = Failure<E> | Success<T>;
