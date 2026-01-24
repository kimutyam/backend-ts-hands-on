import { Url } from './url.js';

type Request = () => Promise<Response>;

const create =
  (url: Url): Request =>
  () =>
    fetch(url);

create.inject = [Url.token] as const;

const Request = {
  token: 'Request',
  create,
} as const;

export { Request };
