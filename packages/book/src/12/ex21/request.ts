import { Url } from './url.js';

type Request = () => Promise<Response>;

// 1
const create =
  (url: Url): Request =>
  () =>
    fetch(url);

// 2
create.inject = [Url.token] as const;

const Request = {
  token: 'Request',
  create,
} as const;

export { Request };
