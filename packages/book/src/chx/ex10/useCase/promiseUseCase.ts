export interface PromiseUseCase<Input, Output> {
  run: (input: Input) => Promise<Output>;
}
