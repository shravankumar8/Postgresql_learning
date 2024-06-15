import { Client } from "pg";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function cnectDB() {
  const client = new Client({
    connectionString: "postgres://postgres:shravan123@localhost/test1",
  });

  try {
    await client.connect();
    const email:string=prompt("enter your Email first laude : ")
    let  userId=0; 
    if(email){
    const query: string = "SELECT id FROM users WHERE email=$1 ";
    const values = [email];
    const result = await client.query(query, values);
    userId= result.rows[0].id;

    }
    const city: string = prompt("Enter your city: ");
    const country: string = prompt("Enter your country: ");
    const street: string = prompt("Enter a street: ");
    const pincode: string = prompt("Enter a pincode: ");

// INSERT INTO addresses (user_id, city, country, street, pincode)
// VALUES (1, 'New York', 'USA', '123 Broadway St', '10001');

const addressquery:string="INSERT INTO address (user_id, city, country, street, pincode) VALUES ($1,$2,$3,$4,$5)"
    const addressvalues = [userId, city, country, street, pincode];
      const Addresult = await client.query(addressquery, addressvalues);
      console.log(Addresult.command, Addresult);

    // const query: string =
    //   "INSERT INTO users (username,email,password) VALUES($1,$2,$3)";
    // const values = [username, email, password];

    // const result = await client.query(query, values);
    // console.log(result.command, result);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end(); // Close the connection
    process.exit();
  }
}
cnectDB();
