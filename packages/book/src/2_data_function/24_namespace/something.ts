interface Something {
  readonly id: string;
  readonly name: string;
}

declare function buildAt(name: string): Something;

export { buildAt };
