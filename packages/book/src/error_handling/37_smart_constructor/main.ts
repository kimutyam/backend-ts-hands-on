import type { Result } from '../23_result/result';
import { Failure, Success } from '../23_result/result';
import { FormatError } from './binaryNumberFormatError';

function isBinaryNumber(s: string) {
  return /^[01]+$/.test(s);
}

export class BinaryNumber {
  private constructor(public value: string) {}

  add(n: number): BinaryNumber {
    throw new Error(`未実装。value:${n}`);
  }

  static create(value: string): Result<BinaryNumber, FormatError> {
    return isBinaryNumber(value)
      ? Success(new BinaryNumber(value))
      : Failure(new FormatError('2進数のフォーマットではありません'));
  }
}
