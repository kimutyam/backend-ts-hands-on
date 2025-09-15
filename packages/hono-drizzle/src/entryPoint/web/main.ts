import { WebInjector } from '../injector/webAdapter.js';
import { makeApp } from './helper/app.js';
import { Server } from './helper/server.js';

// TODO: switch to env var
const [rootInjector, webInjector] = WebInjector.build(true);
const app = makeApp(webInjector);
const server = Server.run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => Server.shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => Server.shutdown(server, rootInjector, 'SIGTERM'));
