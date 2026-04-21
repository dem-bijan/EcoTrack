import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt_token')?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const springResponse = await fetch("http://localhost:8080/api/verify/send", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!springResponse.ok) {
            const errorData = await springResponse.text();
            return NextResponse.json({ message: errorData || "Failed to send code" }, { status: springResponse.status });
        }

        return NextResponse.json({ message: "Verification code sent!" });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
