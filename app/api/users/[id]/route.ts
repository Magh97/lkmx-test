import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: {params : Promise<{id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) return NextResponse.json({
            error: "Invalid id"
        }, { status: 400 });

        const { email, name } = await req.json();

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name, 
                email
            }
        });

        return NextResponse.json(updatedUser, {
            status: 200
        });
    } catch(err) {
        return NextResponse.json({
            error: "Error updating user"
        }, { status : 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: {params : Promise<{id: string }> }
) {
    try {
        const { id } = await params;
        const userId = parseInt(id);

        if (isNaN(userId)) return NextResponse.json({
            error: "Invalid id"
        }, { status: 400 });
        
        await prisma.user.delete({
            where: {
                id: userId
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