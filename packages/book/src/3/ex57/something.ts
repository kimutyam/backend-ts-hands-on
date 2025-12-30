interface Something {
  readonly id: string;
  readonly name: string;
}

declare function build(name: string): Something;

export { build };
