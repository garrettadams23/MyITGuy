import { neon } from "@neondatabase/serverless";

export async function handler(event, context) {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "DATABASE_URL environment variable is not set" }),
    };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`select now() as now`;

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        message: "Database test successful", 
        db_time: rows[0].now 
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Failed to connect to database", details: error.message }),
    };
  }
}
