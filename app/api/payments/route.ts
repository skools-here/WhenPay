import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma=new PrismaClient()
export async function POST (req:NextRequest){
    const user = await getCurrentUser();

    if (user == null) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body=await req.json()
    const { paymentName, description, amount, category, deadline } = body;

    if (!paymentName || !amount || !category || !deadline) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newPayment = await prisma.payment.create({
    data: {
    paymentName,
    description,
    amount: parseFloat(amount),
    category,
    deadline: new Date(deadline),
    status: "pending",
    userId: user.id,
    },
    });
    return NextResponse.json(newPayment, { status: 201 });
}

export async function GET (){
    const user = await getCurrentUser();

    if (user == null) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payments=await prisma.payment.findMany({
        where:{userId:user.id},
        orderBy: { deadline: "asc" },
    })
    return NextResponse.json({ payments});
}



export function DELETE(){

}
