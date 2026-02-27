import { NextResponse } from "next/server";

export async function GET() {
    NextResponse.json({
        message : "The service is ON"
    }, { status : 200 })
}