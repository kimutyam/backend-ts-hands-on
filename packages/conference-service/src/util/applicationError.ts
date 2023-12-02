/**
 * @example
 * type MyError = ApplicationError<'MyError', Readonly<{myId: string}>>;
 *
 * 型引数の第一引数はリテラル型にすることで、discriminated union型として判別が可能になります。
 * messageだけを利用する場合はunion型の判別は不要ですが、detailは独自の型が入るため判別して利用します。
 */
export interface ApplicationError<K extends string, Detail extends Record<string, unknown>> {
  readonly kind: K;
  readonly message: string;
  readonly detail: Detail;
}
