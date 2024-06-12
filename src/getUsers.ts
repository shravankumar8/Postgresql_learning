import { Client } from "pg";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/employee",
  });

  try {
    await client.connect();

    const email: string = prompt("Enter Email to get  ");

    const query: string = "SELECT * FROM users WHERE email=$1 ";
    const values = [email];
    const result = await client.query(query, values);
    console.log(result.command, result);
    if (result.rows.length > 0) {
      console.log("user found", result.rows[0]);
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.end(); // Close the connection
    process.exit();
  }
}
cnectDB();
