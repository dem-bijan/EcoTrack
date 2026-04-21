import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// FETCH MONGODB IMAGE
export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt_token')?.value;

        if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

        const springResponse = await fetch("http://localhost:8080/api/images", {
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}` 
            }
        });

        if (springResponse.status === 404) {
            return NextResponse.json({ message: "No custom image found" }, { status: 404 });
        }

        const data = await springResponse.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch graphic" }, { status: 500 });
    }
}

// UPLOAD TO MONGODB
export async function POST(request: Request) {
    try {
        const body = await request.json(); 
        
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt_token')?.value;

        if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

        const springResponse = await fetch("http://localhost:8080/api/images", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(body),
        });

        if (!springResponse.ok) throw new Error("Java backend rejected the image");

        return NextResponse.json({ message: "Image Saved to MongoDB!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Failed to upload image to database" }, { status: 500 });
    }
}
