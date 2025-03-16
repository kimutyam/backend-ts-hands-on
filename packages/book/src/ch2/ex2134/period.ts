interface Period {
  readonly start: Date;
  readonly end: Date;
}

declare function of(start: Date, periodDate: number): Period;

declare function isWithin(): boolean;

declare function postpone(): Period;
declare function extend(): Period;

export { of, isWithin, extend, postpone, type Period };
