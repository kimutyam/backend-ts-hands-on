interface StudentId {
  // 学年
  readonly grade: number;
  // 組
  readonly class: string;
  // 出席番号
  readonly attendanceNumber: number;
}

const equals = (x: StudentId, y: StudentId): boolean =>
  x.grade === y.grade && x.class === y.class && x.attendanceNumber === y.attendanceNumber;

export { type StudentId, equals };
