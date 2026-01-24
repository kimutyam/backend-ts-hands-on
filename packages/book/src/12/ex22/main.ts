import { createChildInjector, createRootInjector } from './injector.js';
import { PrintResponse } from './printResponse.js';

const rootInjector = createRootInjector();
const childInjector = createChildInjector(rootInjector);

const printResponse = childInjector.injectFunction(PrintResponse.create);

try {
  await printResponse('--- Response Start ---', '--- Response End ---');
} finally {
  // 1
  await rootInjector.dispose();
}
