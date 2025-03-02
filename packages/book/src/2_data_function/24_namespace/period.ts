interface Period {
  readonly start: Date;
  readonly end: Date;
}

declare function buildAt(
  start: Date,
  periodDate: number,
): Period;

export { buildAt, type Period };
