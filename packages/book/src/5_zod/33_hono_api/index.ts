import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.post('/', async (c) => {
  const employee = await c.req.json<{ name: string; age: number }>();
  return c.json({ message: `Hello ${employee.name.toUpperCase()}!` });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
