import { WebInjector } from '../injector/webAdapter.js';
import { makeApp } from './helper/app.js';
import { Server } from './helper/server.js';
import { AppEnv } from '../../helper/env.js';

const appEnv = AppEnv.parse(process.env);
const [rootInjector, webAdaptorInjector] = WebInjector.build(appEnv);
const app = makeApp(webAdaptorInjector);
const server = Server.run(app);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGINT', () => Server.shutdown(server, rootInjector, 'SIGINT'));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
process.on('SIGTERM', () => Server.shutdown(server, rootInjector, 'SIGTERM'));
