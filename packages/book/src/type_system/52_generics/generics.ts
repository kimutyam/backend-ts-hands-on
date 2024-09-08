interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface NoBodyResponse extends ApiResponse<undefined> {}

interface PayloadResponse extends ApiResponse<string> {}

interface UserResponse
  extends ApiResponse<{
    name: string;
  }> {}

export type { ApiResponse, UserResponse, NoBodyResponse, PayloadResponse };
