const { Pool } = require('pg');
export const pgPool = new Pool({
  user: 'brandnday',
  host: 'localhost',
  database: 'adb1',
  password: 'iwillliveandlove',
  port: 5432
});
//# sourceMappingURL=database.js.map