import { Db } from '../../db.js';

const testDb = Db.build(process.env['DATABASE_URL']!);

export { testDb };
