export class CustomTwoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomTwoError';
  }
}
