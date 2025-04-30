import { Hono } from 'hono';

const build = () => new Hono();

type App = ReturnType<typeof build>;

const App = {
  token: 'App' as const,
  build,
} as const;

export { App };
