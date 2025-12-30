const toInt = (s: string): number => {
  const parsed = Number.parseInt(s, 10);
  if (!Number.isInteger(parsed)) {
    throw new Error('Numberに変換できません');
  }
  return parsed;
};

export { toInt };
