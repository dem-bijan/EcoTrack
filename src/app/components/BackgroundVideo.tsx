"use client";
import React from "react";

export default function BackgroundVideo() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{ transform: "translateZ(0)" }} // Force GPU acceleration
                className="w-full h-full object-cover opacity-60 scale-105 blur-[2px]"
            >
                <source src="/nature.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
            <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>
    );
}
