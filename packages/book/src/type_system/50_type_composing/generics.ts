interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Tはなんでも入る
interface UserResponse
  extends ApiResponse<{
    id: number;
    name: string;
  }> {}

interface NoBodyResponse extends ApiResponse<undefined> {}

interface PayloadResponse extends ApiResponse<string> {}

interface ApiEntityResponse<T extends { id: number }> {
  status: number;
  message: string;
  data: T;
}

export type { ApiResponse, UserResponse, NoBodyResponse, PayloadResponse, ApiEntityResponse };
