import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.post('/', async (c) => {
  const value: unknown = await c.req.json();
  if (typeof value !== 'object' || value === null) {
    return c.json({ error: 'Input is not a valid object' }, 400);
  }
  if (!('name' in value) || typeof value.name !== 'string') {
    return c.json({ error: 'Name must be string' }, 400);
  }
  if (!('age' in value) || typeof value.age !== 'number') {
    return c.json({ error: 'Age must be number' }, 400);
  }
  if (value.name.length < 3) {
    return c.json({ error: 'Name must be more than 3 characters' }, 400);
  }
  if (value.age < 20) {
    return c.json({ error: 'Age must be greater than 20' }, 400);
  }

  const employee = {
    name: value.name,
    age: value.age,
  };
  return c.json({
    message: `Hello ${employee.name.toUpperCase()}!`,
  });
});

const port = 3000;
console.log(`Server is running on port ${port.toString()}`);

serve({
  fetch: app.fetch,
  port,
});
