import { Pool } from "pg";

const connectionString = 'postgres://opwkourc:teOoQhliE9UDqkkVyj5_4s9C5CoCE_BB@kesavan.db.elephantsql.com/opwkourc';
const db = new Pool({connectionString});

export default db;