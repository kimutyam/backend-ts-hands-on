export const toErrorMessage = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message;
  }
  return 'Cause unknown';
};
