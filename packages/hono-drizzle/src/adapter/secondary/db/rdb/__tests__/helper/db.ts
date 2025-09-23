import { Db } from '../../db.js';

const testDb = Db.build(
  'postgresql://postgres:postgres@localhost:5433/test_db',
);

export { testDb };
