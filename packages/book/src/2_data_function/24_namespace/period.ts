interface Period {
  readonly start: Date;
  readonly end: Date;
}

declare function build(start: Date, periodDate: number): Period;

export { build, type Period };
