import type { Eq } from '../80_entity/eq';

export type StudentId = Readonly<{
  // 学年
  grade: number;
  // 組
  class: string;
  // 出席番号
  attendanceNumber: number;
}>;

const equals: Eq<StudentId> = (x: StudentId, y: StudentId): boolean =>
  x.grade === y.grade && x.class === y.class && x.attendanceNumber === y.attendanceNumber;

export type Student = Readonly<{
  id: StudentId;
  name: string;
}>;

const isSameIdentity: Eq<Student> = (x: Student, y: Student): boolean => equals(x.id, y.id);

export const Student = {
  isSameIdentity,
} as const;
