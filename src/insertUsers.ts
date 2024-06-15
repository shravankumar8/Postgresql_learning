import { Client } from "pg";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/test1",
  });

  try {
    await client.connect();

    const username: string = prompt("Enter your Username: ");
    const email: string = prompt("Enter your Email: ");
    const password: string = prompt("Enter a Password: ");

    const query: string =
      "INSERT INTO users (username,email,password) VALUES($1,$2,$3)";
    const values = [username, email, password];

    const result = await client.query(query, values);
    console.log(result.command, result);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end(); // Close the connection
    process.exit();
  }
}
cnectDB();
