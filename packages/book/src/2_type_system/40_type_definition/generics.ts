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

interface UserResponse extends ApiResponse<User> {}

export type { ApiResponse, User, UserResponse };
