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

type Result<E, T> = Failure<E> | Success<T>;

export { Success, Failure, type Result };
