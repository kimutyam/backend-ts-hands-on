type Success<T> = {
  success: true;
  data: T;
};
const Success = <T>(data: T): Success<T> => ({ success: true, data });
type Failure<E> = {
  success: false;
  error: E;
};
const Failure = <E>(error: E): Failure<E> => ({ success: false, error });

type Result<T, E> = Success<T> | Failure<E>;

export { Success, Failure, type Result };
