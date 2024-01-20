export class CustomOneError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomOneError';
  }
}
