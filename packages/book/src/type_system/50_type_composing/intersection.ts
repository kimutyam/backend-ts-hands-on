import type { MemberId, UserId } from './types';

// ( string | number )型と、(string | boolean)の共通部分 => string型
type UserIdAndMemberId = UserId & MemberId;

// "hi"型と"hello"型の共通部分は存在しない => never型
type NeverGreeting = 'hi' & 'hello';

export type { UserIdAndMemberId, NeverGreeting };
