interface ApplicationError<S extends string> {
  readonly kind: S;
}

export { type ApplicationError };
