import type { NotFoundError } from 'ch4/ex4312/notFoundError.js';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { Result } from 'neverthrow';

declare const r: Result<number, NotFoundError>;

const app = new Hono();

app.get('/user', async (c, next) => {
  r.match(
    (n) => c.text(n.toString()),
    ({ message }) => {
      throw new HTTPException(404, { message });
    },
  );
  await next();
});
