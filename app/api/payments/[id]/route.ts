import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (user==null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payment = await prisma.payment.findUnique({
    where: { id: params.id },
    });

    if (!payment || payment.userId !== user.id) {
    return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }

    await prisma.payment.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
}