import { createPool } from "mysql2";

// Create the connection pool. The pool-specific settings are the defaults
const pool = createPool({
  host: "localhost",
  user: "root",
  database: "project04",
  password: "12345678",
});

const db = pool.promise();
export { db };
