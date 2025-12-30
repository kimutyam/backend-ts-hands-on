interface ApiEntityResponse<T extends { id: number }> {
  status: number;
  message: string;
  data: T;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type NoBodyResponse = ApiEntityResponse<undefined>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type PayloadResponse = ApiEntityResponse<string>;

type UserResponse = ApiEntityResponse<{
  id: number;
  name: string;
}>;

export type {
  ApiEntityResponse,
  NoBodyResponse,
  PayloadResponse,
  UserResponse,
};
