interface Encoder<S, A> {
  encode: (a: A) => S;
}

const encoderFromPrism = <S, A>(prism: { reverseGet: (a: A) => S }): Encoder<S, A> => ({
  encode: (a: A) => prism.reverseGet(a),
});

export { type Encoder, encoderFromPrism };
