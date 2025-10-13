import { Db } from '../../db.js';

const testDb = Db.create(process.env['DATABASE_URL']!);

export { testDb };
