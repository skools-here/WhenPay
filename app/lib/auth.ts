import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export async function getCurrentUser(){
    const session =await getServerSession(authOptions)
}

export { authOptions };
