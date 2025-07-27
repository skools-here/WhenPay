import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma=new PrismaClient()

export async function PATCH (req:NextRequest){ //pending → paid
    const user=getCurrentUser()
    if (user==null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { status } = await req.json();
    const payment=await prisma.payment.findUnique({
        where:{id:params.id},
    })
    
    if (!payment || payment.userId !== user.id) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }

    const updated = await prisma.payment.update({
    where: { id: params.id },
    data: { status },
    });

    return NextResponse.json(updated);
}