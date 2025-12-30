interface ApplicationError<S extends string> {
  readonly kind: S;
  readonly message: string;
}

export { type ApplicationError };
