"use client";
import React from "react";
import Image from "next/image";

export default function BackgroundVideo() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
                width={1920}
                height={1080}
                src="/forest.jpg"
                alt="Background Image"
                className="w-full h-full object-cover opacity-60 scale-105 blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
            <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>
    );
}
