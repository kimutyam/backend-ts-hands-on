interface ApiEntityResponse<T extends { id: number }> {
  status: number;
  message: string;
  data: T;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type NoBodyResponse = ApiEntityResponse<undefined>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type PayloadResponse = ApiEntityResponse<string>;

type UserResponse = ApiEntityResponse<{
  id: number;
  name: string;
}>;

export type {
  UserResponse,
  NoBodyResponse,
  PayloadResponse,
  ApiEntityResponse,
};
