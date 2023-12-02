export interface Encoder<S, A> {
  encode: (a: A) => S;
}
