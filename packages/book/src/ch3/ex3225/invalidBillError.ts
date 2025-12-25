class InvalidBillError extends Error {
  constructor(public readonly bill: number) {
    super('請求額は正の整数で指定してください');
    this.name = this.constructor.name;
  }
}

export { InvalidBillError };
