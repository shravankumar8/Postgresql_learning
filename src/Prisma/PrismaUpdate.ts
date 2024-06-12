import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import PromptSync from "prompt-sync";
const prompt = PromptSync();
interface UpdateInterface {
  firstName: string;
  lastName: string;
}

function connectDb(){
    const email: string = prompt("Enter your Email: ");
    const firstName: string = prompt("Enter a FirstName: ");
    const lastName: string = prompt("Enter a lastName: ");
    UpdateInfo(email,{firstName,lastName})
}

async function UpdateInfo(
  email: string,
  { firstName, lastName }: UpdateInterface
) {
  const res = await prisma.user.update({
    where: {
      email,
    },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}
connectDb()