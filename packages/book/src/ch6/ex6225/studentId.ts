interface StudentId {
  readonly grade: number;
  readonly class: string;
  readonly attendanceNumber: number;
}

const equals = (x: StudentId, y: StudentId): boolean =>
  x.grade === y.grade &&
  x.class === y.class &&
  x.attendanceNumber === y.attendanceNumber;

export { equals, type StudentId };
