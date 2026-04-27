"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileImage() {
    const [preview, setPreview] = useState<string>("https://api.dicebear.com/7.x/initials/svg?seed=EcoWarrior&backgroundColor=10b981");

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
        <div
            className="rounded-full overflow-hidden border border-[#2D3033] bg-[#101214] flex-shrink-0"
            style={{ width: '32px', height: '32px', minWidth: '32px', minHeight: '32px' }}
        >
            <img
                src={preview}
                alt="Avatar"
                className="w-full h-full object-cover"
                style={{ display: 'block', width: '100%', height: '100%' }}
            />
        </div>
    );
}