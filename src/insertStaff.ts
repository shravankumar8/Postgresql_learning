import { Client } from "pg";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/employee",
  });

  try {
    await client.connect();
    const id:number = parseInt(prompt("Enter your id:"));
    const name:string = prompt("Enter your name:");
    const age:number = parseInt(prompt("Enter your age:"));

    const query:string = "INSERT INTO staff (id,name,age) VALUES($1,$2,$3)";
    const values = [id, name, age];

    const result = await client.query(query, values);
    console.log(result.command, result);
  } catch (error) {
    console.log(error);
  }
}
cnectDB();
