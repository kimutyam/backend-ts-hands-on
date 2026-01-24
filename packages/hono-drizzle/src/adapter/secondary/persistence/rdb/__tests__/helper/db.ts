import { Db } from '../../db.js';

const TestDb = Db.getInstance(process.env['DATABASE_URL']!);

export { TestDb };
