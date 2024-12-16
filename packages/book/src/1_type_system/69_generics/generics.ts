interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

type NoBodyResponse = ApiResponse<undefined>;

type PayloadResponse = ApiResponse<string>;

type UserResponse = ApiResponse<{
  name: string;
}>;

export type { ApiResponse, UserResponse, NoBodyResponse, PayloadResponse };
