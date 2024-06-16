import { Client } from "pg";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/test1",
  });
  await client.connect();

  const email = prompt("Enter your Email Address : ");
  let userId = 0;
  const result = await client.query("SELECT id from users WHERE email=$1", [
    email,
  ]);
  userId = result.rows[0].id;
  //  SELECT u.id,u.email,u.username,u.password,a.city,a.country,a.street,a.pincode FROM users u JOIN address a ON u.id=a.user_id  ;
  //
  const JoinQuery = await client.query(
    "SELECT u.id,u.email,u.username,a.street,a.city,a.country,a.pincode FROM users u JOIN address a ON u.id=a.user_id WHERE u.id=$1",
    [userId]
  );
  console.log(JoinQuery.rows[0]);
}
cnectDB();
