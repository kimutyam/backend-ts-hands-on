class OptimisticLockError extends Error {
  constructor(aggregateName: string) {
    super(`同時更新が検知されました: ${aggregateName}`);
  }
}

export { OptimisticLockError };
