import type { User, Employee, Student, Member } from './objectTypes';

// 同じ構造の共通部分
// {id: string} または、 {id: string} => {id: string}
type UserOrStudent = User | Student;

const userOrStudent: UserOrStudent = {
  id: '',
};

// 異なる構造であるが、同じプロパティを持つ場合も、直積
// {id: string} または、{id: string, name: number}
type UserOrEmployee = User | Employee;

const userOrEmployee1: UserOrEmployee = { id: '' };
const userOrEmployee2: UserOrEmployee = { id: '', name: '' };
const userOrEmployee3: User = userOrEmployee2;

// 異なる構造の共通部分
// {id: string} または、{memberId: number}
type UserOrMember = User | Member;
const userOrMember1: UserOrMember = { id: '' };
const userOrMember2: UserOrMember = { memberId: 1 };

console.log(
  userOrStudent,
  userOrMember1,
  userOrMember2,
  userOrEmployee1,
  userOrEmployee2,
  userOrEmployee3,
);
