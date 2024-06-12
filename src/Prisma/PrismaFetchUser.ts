import { PrismaClient } from "@prisma/client";
import PromptSync from "prompt-sync";
const prisma = new PrismaClient();

const prompt = PromptSync();

function connectDb() {
  const email: string = prompt("Enter you email");
  getUser(email);
}

async function getUser(email: string) {
  const User = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  console.log(User);
}
