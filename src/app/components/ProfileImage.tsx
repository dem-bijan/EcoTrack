"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ProfileImage() {
    const [preview, setPreview] = useState<string>("https://api.dicebear.com/7.x/initials/svg?seed=EcoWarrior&backgroundColor=10b981");

    // We will use a Ref to link a beautiful custom button directly to the ugly HTML file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // FETCH IMAGE ON PAGE LOAD
    useEffect(() => {
        axios.get("/api/images")
            .then(res => {
                if (res.data && res.data.base64Image) {
                    setPreview(res.data.base64Image);
                }
            })
            .catch(err => {
                console.log("No custom image found. Using default.");
            });
    }, []);

    return (
        <div className="flex items-center gap-8">
            {/* The Actual Display Image */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-[#2D3033] shadow-lg bg-[#101214]">
                <img
                    src={preview}
                    alt="Avatar"
                    className={`w-full h-full object-cover transition-all duration-300`}
                />
            </div>
        </div>
    );
}