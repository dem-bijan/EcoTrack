import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
    const body = await request.json();
    const token = (await cookies()).get('jwt_token')?.value;

    const res = await fetch("http://localhost:8080/api/users/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(body)
    });

    if (!res.ok) return NextResponse.json({ message: "Failed to update name" }, { status: 400 });
    return NextResponse.json({ message: "Name updated successfully" });
}