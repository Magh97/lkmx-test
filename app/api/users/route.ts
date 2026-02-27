import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 201 });
    } catch(err) {
        return NextResponse.json({
            error: 'Error fetching users'
        }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json({ 
            error: 'Error creating user' 
        }, { status: 500 });
    }
}

