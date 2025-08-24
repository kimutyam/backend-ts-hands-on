interface Period {
  readonly start: Date;
  readonly end: Date;
}

declare function build(start: Date, periodDays: number): Period;

declare function isWithin(): boolean;

declare function postpone(): Period;
declare function extend(): Period;

export { build, isWithin, extend, postpone, type Period };
