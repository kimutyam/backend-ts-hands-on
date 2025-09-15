import { buildInjector } from '../injector/webBuilder.js';
import { makeApp } from './helper/app.js';
import { Server } from './helper/server.js';

const [rootInjector, webInjector] = buildInjector();
const app = makeApp(webInjector);
const server = Server.run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => Server.shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => Server.shutdown(server, rootInjector, 'SIGTERM'));
