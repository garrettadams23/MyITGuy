/*import pg from "pg";
const { Client } = pg;

export async function handler() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const res = await client.query("select now() as now");
  await client.end();

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(res.rows[0])
  };
}
*/
import { neon } from "@neondatabase/serverless";

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`select now() as now`;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(rows[0]),
  };
}

