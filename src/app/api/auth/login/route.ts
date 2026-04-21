import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // 1. Forward the user's credentials to our true Spring Boot backend
        const springResponse = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await springResponse.json();

        // If Spring Boot rejected the login
        if (!springResponse.ok) {
            return NextResponse.json({ message: data.message || "Invalid credentials." }, { status: 401 });
        }

        // 2. We received the JWT Token from Spring Boot successfully!
        const token = data.token;

        // 3. SECURE COOKIE VAULT: Tell the browser to store this token as an HttpOnly Cookie
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'jwt_token',
            value: token,
            httpOnly: true, // Absolutely no JavaScript can touch this (Blocks XSS attacks)
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'lax', // Protects against CSRF attacks
            path: '/', // Valid everywhere on the website
            maxAge: 60 * 60 * 24 // 1 day expiration
        });

        return NextResponse.json({ message: "Login successful!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
