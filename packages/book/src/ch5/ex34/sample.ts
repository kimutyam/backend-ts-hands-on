import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

const app = new Hono();

const parseEmployee = (json: any): Result<{ name: string; age: number }, ReadonlyArray<string>> => {
  const errors: Array<string> = [];

  if (typeof json !== 'object' || json === null) {
    errors.push('Input is not a valid object.');
  } else {
    if (typeof json.name !== 'string') {
      errors.push("Property 'name' must be a string.");
    } else if (json.name.length < 3) {
      errors.push("Property 'name' must be at least 3 characters long.");
    }

    if (typeof json.age !== 'number') {
      errors.push("Property 'age' must be a number.");
    } else if (json.age < 20) {
      errors.push("Property 'age' must be at least 20.");
    }
  }

  return errors.length > 0 ? err(errors) : ok({ name: json.name, age: json.age });
};

app.post('/', async (c) => {
  const json = await c.req.json();
  parseEmployee(json).match(
    (employee) =>
      c.json({
        message: `Hello ${employee.name.toUpperCase()}!`,
      }),
    (errors) => c.json({ errors }, 400),
  );
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
