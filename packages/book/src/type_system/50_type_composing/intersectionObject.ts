import type { Employee, Member, Student, User } from './objectTypes';

// 同じ構造の共通部分は、同じ
// {id: string} かつ {id: string} => {id: string}
interface UserAndStudent extends User, Student {}
const userAndStudent: UserAndStudent = { id: '' };

// 異なる構造であるが、同じプロパティを持つ場合も、直積
// {id: string} かつ {id:string, name: number} => {id: string, name: string}
interface UserAndEmployee extends User, Employee {}

const userAndEmployee: UserAndEmployee = { id: '', name: '' };

// 異なる構造の共通部分は、直積
// {id: string} かつ {memberId: number} => {id: string, memberId: number}
interface UserAndMember extends User, Member {}

const userAndMember: UserAndMember = { id: '', memberId: 1 };

console.log(userAndStudent, userAndMember, userAndEmployee);

export type { UserAndStudent, UserAndMember, UserAndEmployee };
