import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function cnectDB() {
  try {
    const email: string = prompt("Enter your Email: ");
    const password: string = prompt("Enter your Password: ");
    const firstName: string = prompt("Enter a FirstName: ");
    const lastName: string = prompt("Enter a lastName: ");

    insertUser(email,password,firstName,lastName)


  } catch (error) {
    console.log(error);
  } finally {
  }
}
cnectDB();

async function insertUser(email: string, password: string,firstName: string,lastName: string):Promise<void>
{
    const res=await prisma.user.create({
        data:{
            email,
            password,
            firstName,
            lastName,
        }
    })
    console.log(res)
}

