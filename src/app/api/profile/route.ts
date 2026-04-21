import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const cookieStore = await cookies()
        const token = cookieStore.get("jwt_token")?.value;

        if (!token) {
            return NextResponse.json({
                message:
                    "Unauthorized. Missing something"
            },
                { status: 401 }
            )
        }
        const springResponse = await fetch("http://localhost:8080/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const dataText = await springResponse.text()

        if (!springResponse.ok) {
            return NextResponse.json({ message: dataText }
                , { status: springResponse.status }
            )
        }
        return NextResponse.json({ message: dataText }
            , { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Next.js Proxy error" }
            , { status: 500 }
        )
    }

}