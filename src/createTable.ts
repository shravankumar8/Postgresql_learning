import { Client } from "pg";

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/employee",
  });

  try {
    await client.connect();

    const result = await client.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`);
      console.log("Table created successfully")

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
cnectDB();
