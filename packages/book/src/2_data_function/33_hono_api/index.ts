import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { Employee } from '../0_data_and_function/types';

const app = new Hono();

app.post('/', async (c) => {
  const employee = await c.req.json<Employee>();
  return c.json({ message: `Hello ${employee.name.toUpperCase()}!` });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
