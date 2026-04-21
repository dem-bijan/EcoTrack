import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt_token')?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const springResponse = await fetch("http://localhost:8080/api/verify/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ code })
        });

        if (!springResponse.ok) {
            return NextResponse.json({ message: "Invalid or expired code" }, { status: 400 });
        }

        return NextResponse.json({ message: "Email verified!" });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
