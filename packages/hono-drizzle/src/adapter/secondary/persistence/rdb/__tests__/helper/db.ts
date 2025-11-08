import { Db } from '../../db.js';

const TestDb = Db.create(process.env['DATABASE_URL']!);

export { TestDb };
