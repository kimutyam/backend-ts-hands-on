interface ApiEntityResponse<T extends { id: number }> {
  status: number;
  message: string;
  data: T;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface NoBodyResponse extends ApiEntityResponse<undefined> {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface PayloadResponse extends ApiEntityResponse<string> {}

interface UserResponse
  extends ApiEntityResponse<{
    id: number;
    name: string;
  }> {}

export type { UserResponse, NoBodyResponse, PayloadResponse, ApiEntityResponse };
