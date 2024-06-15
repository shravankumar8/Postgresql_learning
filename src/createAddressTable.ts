import { Client } from "pg";

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/test1",
  });

  try {
    await client.connect();

    const result =
      await client.query(` CREATE TABLE address(id SERIAL PRIMARY KEY,user_id INTEGER NOT NUll,city VARCHAR(100)NOT NULL,country VARCHAR(100) NOT NULL,street VARCHAR(200) NOT NULL ,pincode VARCHAR(20),created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id)REFERENCES users(id) ON DELETE CASCADE);
`);
    console.log("Table created successfully");

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
cnectDB();
