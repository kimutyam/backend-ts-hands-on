// ('hi' | 'hello' | 'good afternoon') 型
import type {
  MemberId,
  UserId,
} from '1_type_system/50_type_composing/types.js';

type Greeting = 'hi' | 'hello';

// (string | number | boolean) 型
type UserOrMemberId = UserId | MemberId;
type UsernameOrAliases = string | Array<string>;

export type { Greeting, UserOrMemberId, UsernameOrAliases };
