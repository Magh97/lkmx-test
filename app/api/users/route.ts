import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Context {
    params: {
        id: string;
    }
}

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

export async function PUT(req: Request, { params }: Context) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) return NextResponse.json({
            error: "Invalid id"
        }, { status: 400 });

        const { email, name } = await req.json();

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name, 
                email
            }
        });

        return NextResponse.json(updatedUser, {
            status: 304
        });
    } catch(err) {
        return NextResponse.json({
            error: "Error updating user"
        }, { status : 500 });
    }
}

export async function DELETE(req: Request, { params }: Context) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) return NextResponse.json({
            error: "Invalid id"
        }, { status: 400 });
        
        await prisma.user.delete({
            where: {
                id
            }
        });

        return NextResponse.json({
            message: "User deleted"
        }, { status: 200 })
    } catch(err) {
        return NextResponse.json({
            error: "Error deleting user"
        }, { status: 500 });
    }
}