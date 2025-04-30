import { WebInjector } from 'sample/adaptor/userSide/web/injector.js';
import { UserAccountApi } from 'sample/adaptor/userSide/web/userAccountApi.js';

const injector = WebInjector.create();
const handler = injector.resolve(UserAccountApi.token);

export { handler };
