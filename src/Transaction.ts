import { Client } from "pg";
import PromptSync from "prompt-sync";
const promptSync = PromptSync();

async function connectDb() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/test1",
  });
  try {
    await client.connect();
    const username: string = promptSync("enter a username : ");
    const email: string = promptSync("enter a email : ");
    const password: string = promptSync("enter a password : ");
    const query: string = "BEGIN; -- Start transaction : ";
    const result = await client.query(query);
    const query1: string =
      "INSERT INTO users (username,email,password) VALUES($1,$2,$3) RETURNING id";
    const insertResult = await client.query(query1, [
      username,
      email,
      password,
    ]);
    const userId = insertResult.rows[0].id;
    console.log(
      insertResult.command +
        "the user was successfully saved with id  " +
        userId
    );
    const inputChoice = promptSync("YES to insert address, NO to abort: ");
    if (inputChoice == "YES") {
      const city: string = promptSync("enter a city : ");
      const country: string = promptSync("enter a country : ");
      const street: string = promptSync("enter a street : ");
      const pincode: string = promptSync("enter a pincode : ");
      const query2: string =
        "INSERT INTO address (user_id, city, country, street, pincode) VALUES ($1,$2,$3,$4,$5)";
      const addressResult = await client.query(query2, [
        userId,
        city,
        country,
        street,
        pincode,
      ]);
      console.log(
        addressResult.command + " the address was successfully saved "
      );
      const commitResult = await client.query("COMMIT;");
      console.log(commitResult.command + " the address was successfully saved ");
      await client.end(); // Close the connection
    process.exit();

    } else if (inputChoice == "NO") {
        const commitResult = await client.query("COMMIT;");
        console.log(commitResult.command+"done saved bye")
        await client.end(); // Close the connection
        process.exit();
    } else {
        const commitResult = await client.query("COMMIT;");
        console.log(commitResult.command+"done saved bye")
      console.log("invalid input");
      await client.end(); // Close the connection
      process.exit();
    }
  } catch (error) {}
}
connectDb()