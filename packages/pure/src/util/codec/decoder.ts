export interface Decoder<S, A> {
  decode: (raw: S) => A;
}
