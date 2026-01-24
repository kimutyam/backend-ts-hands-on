import { createAppInjector } from './injector.js';
import { PrintResponse } from './printResponse.js';

const injector = createAppInjector();

// 1
const printResponse = injector.injectFunction(PrintResponse.create);

await printResponse('--- Response Start ---', '--- Response End ---');
