interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface User {
  id: number;
  name: string;
  email: string;
}

type UserResponse = ApiResponse<User>;

export type { ApiResponse, User, UserResponse };
