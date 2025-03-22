class NumberOfMembersError extends Error {
  constructor(
    public readonly members: number, // 1
  ) {
    super('2人以上を指定してください'); // 2
    this.name = this.constructor.name; // 3
  }
}

export { NumberOfMembersError };
