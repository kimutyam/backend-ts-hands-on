class UserAccountNotFoundError extends Error {
  constructor(public readonly userAccountId: string) {
    super(`カートが見つかりませんでした: ${userAccountId}`);
    this.name = this.constructor.name;
  }
}

export { UserAccountNotFoundError };
