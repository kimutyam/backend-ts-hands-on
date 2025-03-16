interface Something {
  readonly id: string;
  readonly name: string;
}

declare function of(name: string): Something;

export { of };
